import styles from "./MenuCard.module.css";

type MenuCardProps = {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  onAdd: () => void;
  onRemove: () => void;
  quantity: number;
};

const MenuCard = ({ name, price, description, imageUrl, onAdd, onRemove, quantity }: MenuCardProps) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.price}>${price.toFixed(2)}</span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <div className={styles.quantityControl}>
            <button onClick={onRemove} className={styles.quantityButton}>
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={onAdd} className={styles.quantityButton}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
