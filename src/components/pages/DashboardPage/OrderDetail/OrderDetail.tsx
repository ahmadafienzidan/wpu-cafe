import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../../../../services/orderService";
import styles from "./OrderDetail.module.css";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => OrderService.getOrderDetail(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => OrderService.deleteOrder(order!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/dashboard/orders");
    },
    onError: () => {
      alert("Failed to delete order");
    },
  });

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error || !order) return <div className={styles.error}>Error loading order</div>;

  const formattedDate = new Date(order.created_at).toLocaleString();

  const handleDelete = () => {
    if (!confirm("Are you sure to delete this order?")) return;
    deleteMutation.mutate();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.orderCard}>
          {/* Header Order */}
          <div className={styles.orderHeader}>
            <div>
              <h1 className={styles.orderTitle}>Order #{order.id.slice(0, 8)}</h1>
              <p className={styles.orderDate}>{formattedDate}</p>
            </div>
            <span className={styles.statusBadge}>{order.status}</span>
          </div>

          {/* Informasi Customer */}
          <div className={styles.customerInfo}>
            <div>
              <h3 className={styles.infoTitle}>CUSTOMER</h3>
              <p className={styles.infoText}>{order.customer_name}</p>
            </div>
            <div>
              <h3 className={styles.infoTitle}>TABLE NUMBER</h3>
              <p className={styles.infoText}>{order.table_number}</p>
            </div>
          </div>

          {/* Daftar Item Order */}
          <div className={styles.orderItems}>
            <h2 className={styles.sectionTitle}>Order Items</h2>
            {order.cart.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.menuItem.name}</h4>
                  <p className={styles.itemDescription}>{item.menuItem.description}</p>
                  <p className={styles.itemNotes}>Notes: {item.notes || "-"}</p>
                </div>
                <div className={styles.itemPrice}>
                  <p className={styles.priceDetail}>
                    {item.quantity} x ${item.menuItem.price.toFixed(2)}
                  </p>
                  <p className={styles.priceTotal}>${(item.quantity * item.menuItem.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ringkasan Order */}
          <div className={styles.orderSummary}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax (10%)</span>
              <span>${(order.total * 0.1).toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>${(order.total * 1.1).toFixed(2)}</span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className={styles.actionButtons}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <button onClick={handleDelete} className={styles.deleteButton} disabled={deleteMutation.isPending}>
              <i className="fas fa-trash"></i> {deleteMutation.isPending ? "Deleting..." : "Delete Order"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage;
