import OrdersTable from "./OrderTable";
import styles from "./Orders.module.css";

const OrdersPage = () => {
  return (
    <div className={styles.container}>
      <OrdersTable></OrdersTable>
    </div>
  );
};

export default OrdersPage;
