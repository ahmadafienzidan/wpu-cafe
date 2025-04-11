// components/home/Reviews.tsx
import { useQuery } from "@tanstack/react-query";
import { ReviewsService } from "../../../../../services/reviewsService";
import StarRating from "../../../../ui/StarRating";
import styles from "../Home.module.css";

const Reviews = () => {
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["homeReviews"],
    queryFn: ReviewsService.getReviews,
    select: (res) => [...res.data].sort(() => 0.5 - Math.random()).slice(0, 3),
  });

  const { data: menuItems } = useQuery({
    queryKey: ["menuItems"],
    queryFn: ReviewsService.getMenuItems,
  });

  const getMenuItemName = (id: string) => menuItems?.data.find((item) => item.id === id)?.name || "Unknown Item";

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.reviewsContainer}>
        <h2 className={styles.reviewsTitle}>What Our Customers Say</h2>
        <p className={styles.reviewsSubtitle}>Discover why people love the unique WPU Cafe</p>
        {isLoading && <div className={styles.loading}>Loading reviews...</div>}
        {error && <div className={styles.error}>Error loading reviews</div>}
        <div className={styles.reviewsGrid}>
          {reviewsData?.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div>
                  <h3 className={styles.reviewerName}>{review.reviewer_name}</h3>
                  <p className={styles.menuItemName}>{getMenuItemName(review.menu_item_id)}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className={styles.reviewComment}>"{review.comment}"</p>
              <p className={styles.reviewDate}>
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
