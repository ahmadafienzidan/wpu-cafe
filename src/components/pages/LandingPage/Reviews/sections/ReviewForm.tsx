import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewsService } from "../../../../../services/reviewsService";
import MenuItemSelect from "../../../../ui/MenuItemSelect/MenuItemSelect";
import StarRating from "../../../../ui/StarRating";
import styles from "../Reviews.module.css";

const ReviewForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    menuItemId: "",
    reviewerName: "",
    rating: 0,
    comment: "",
  });

  const { mutate } = useMutation({
    mutationFn: ReviewsService.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setFormData({ menuItemId: "", reviewerName: "", rating: 0, comment: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.formTitle}>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <MenuItemSelect value={formData.menuItemId} onChange={(e) => setFormData({ ...formData, menuItemId: e.target.value })} />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="reviewerName" className={styles.label}>
            Your Name
          </label>
          <input id="reviewerName" type="text" placeholder="Enter your name" required value={formData.reviewerName} onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Rating</label>
          <StarRating rating={formData.rating} onRate={(rating) => setFormData({ ...formData, rating })} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Review</label>
          <textarea value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} className={styles.textarea} rows={4} required />
        </div>

        <button type="submit" className={styles.button}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
