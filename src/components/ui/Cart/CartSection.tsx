import styles from "./CartSection.module.css";

type CartItem = {
  name: string;
  quantity: number;
  price: number;
  id: string;
  notes: string;
};

type CartSectionProps = {
  items: CartItem[];
  customerName: string;
  tableNumber: string;
  onNotesChange: (id: string, notes: string) => void;
  onCustomerNameChange: (value: string) => void;
  onTableNumberChange: (value: string) => void;
  onRemoveItem: (id: string) => void;
  onSubmit: () => void;
};

const CartSection = ({ items, customerName, tableNumber, onNotesChange, onCustomerNameChange, onTableNumberChange, onRemoveItem, onSubmit }: CartSectionProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Details</h2>

      <div className={styles.inputGroup}>
        <label>Customer Name</label>
        <input type="text" value={customerName} onChange={(e) => onCustomerNameChange(e.target.value)} placeholder="Dahyun" />
      </div>

      <div className={styles.inputGroup}>
        <label>Table Number</label>
        <input type="number" value={tableNumber} onChange={(e) => onTableNumberChange(e.target.value)} placeholder="5" />
      </div>

      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQuantity}>x{item.quantity}</span>
            </div>
            <div>
              <input type="text" placeholder="Notes..." value={item.notes} onChange={(e) => onNotesChange(item.id, e.target.value)} className={styles.notesInput} />
              <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => onRemoveItem(item.id)} className={styles.removeButton}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRowTotal}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button onClick={onSubmit} className={styles.submitButton}>
        Place Order
      </button>
    </div>
  );
};

export default CartSection;
