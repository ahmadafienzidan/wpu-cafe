import { FaStar } from "react-icons/fa";
import styles from "./StarRating.module.css";

type StarRatingProps = {
  rating: number;
  onRate?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= rating;
        return (
          <button key={index} type="button" className={`${styles.starButton} ${isFilled ? styles.filled : ""}`} onClick={() => onRate?.(ratingValue)} disabled={!onRate}>
            <FaStar />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
