import { useQuery } from "@tanstack/react-query";
import { ReviewsService, Review } from "../../../../../services/reviewsService";
import ReviewCard from "./ReviewCard";
import styles from "../Reviews.module.css";

interface ReviewListProps {
  getMenuItemName: (id: string) => string;
}

const ReviewList: React.FC<ReviewListProps> = ({ getMenuItemName }) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: ReviewsService.getReviews,
  });

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className={styles.list}>
      {reviews?.data.map((review: Review) => (
        <ReviewCard key={review.id} review={review} getMenuItemName={getMenuItemName} />
      ))}
    </div>
  );
};

export default ReviewList;
