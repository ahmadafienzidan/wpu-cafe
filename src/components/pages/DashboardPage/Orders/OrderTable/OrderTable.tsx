import { useEffect, useState } from "react";
import styles from "./OrderTable.module.css";
import OrderRow from "../OrderRow";
import { OrderService } from "../../../../../services/orderService";

const OrdersTable = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchOrders = async () => {
    try {
      const params = {
        search: searchTerm,
        status: statusFilter,
        page: 1,
        pageSize: 10,
      };
      const response = await OrderService.getOrders(params);
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.filterSelect}>
          <option value="">All Status</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div className={styles.header}>
        <h2 className={styles.title}>Order Management</h2>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Order No</th>
              <th className={styles.headerCell}>Created At</th>
              <th className={styles.headerCell}>Customer</th>
              <th className={styles.headerCell}>Table</th>
              <th className={styles.headerCell}>Items</th>
              <th className={styles.headerCell}>Status</th>
              <th className={styles.headerCell}>Total</th>
              <th className={styles.headerCell}>Actions</th>
              <th className={styles.headerCell}>Options</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} onUpdate={fetchOrders} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
