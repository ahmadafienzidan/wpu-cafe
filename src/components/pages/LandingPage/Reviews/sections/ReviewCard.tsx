import { Review } from "../../../../../services/reviewsService";
import StarRating from "../../../../ui/StarRating";
import styles from "../Reviews.module.css";

interface ReviewCardProps {
  review: Review;
  getMenuItemName: (id: string) => string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, getMenuItemName }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div>
          <h4>{review.reviewer_name}</h4>
          <p className={styles.menuItem}>{getMenuItemName(review.menu_item_id)}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <p className={styles.date}>
        {new Date(review.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default ReviewCard;
