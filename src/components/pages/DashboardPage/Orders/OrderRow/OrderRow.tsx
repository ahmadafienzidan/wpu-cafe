import { useState } from "react";
import { Link } from "react-router-dom";
import { OrderService } from "../../../../../services/orderService";
import styles from "./OrderRow.module.css";

type OrderRowProps = {
  order: {
    id: string;
    customer_name: string;
    table_number: number;
    cart: Array<{
      quantity: number;
      notes: string;
      menuItem?: { name: string };
    }>;
    status: string;
    total: number;
    created_at: string;
  };
  onUpdate: () => void;
};

const OrderRow = ({ order, onUpdate }: OrderRowProps) => {
  const [status, setStatus] = useState(order.status);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await OrderService.updateOrderStatus(order.id, newStatus);
      setStatus(newStatus);
      onUpdate();
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure to delete this order?")) return;
    setIsDeleting(true);
    try {
      await OrderService.deleteOrder(order.id);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete order");
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(order.created_at).toLocaleString();

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{order.id.slice(0, 8)}</td>
      <td className={styles.cell}>{formattedDate}</td>
      <td className={styles.cell}>{order.customer_name}</td>
      <td className={styles.cell}>{order.table_number}</td>
      <td className={styles.cellItems}>
        {order.cart.map((item, index) => (
          <div key={index} className={styles.item}>
            <span>
              {item.menuItem?.name} x{item.quantity}
            </span>
            {item.notes && <span className={styles.note}>({item.notes})</span>}
          </div>
        ))}
      </td>
      <td className={styles.cell}>
        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>{status}</span>
      </td>
      <td className={styles.cell}>${order.total.toFixed(2)}</td>
      <td className={styles.cell}>
        <div className={styles.actions}>
          <select value={status} onChange={(e) => handleStatusChange(e.target.value)} className={styles.select} disabled={isDeleting}>
            <option value="PROCESSING">PROCESSING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
          <button onClick={handleDelete} className={styles.deleteButton} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </td>
      <td className={styles.cell}>
        <Link to={`/dashboard/orders/${order.id}`} className={styles.detailLink}>
          Show Details
        </Link>
      </td>
    </tr>
  );
};

export default OrderRow;
