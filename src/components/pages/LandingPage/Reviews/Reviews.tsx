import { useQuery } from "@tanstack/react-query";
import { ReviewsService } from "../../../../services/reviewsService";
import styles from "./Reviews.module.css";
import { ReviewForm, ReviewList } from "./sections";

const Reviews: React.FC = () => {
  const { data: menuItems } = useQuery({
    queryKey: ["menuItems"],
    queryFn: ReviewsService.getMenuItems,
  });

  const getMenuItemName = (menuItemId: string) => {
    const item = menuItems?.data.find((item) => item.id === menuItemId);
    return item?.name || "Unknown Menu";
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridTwoCols}>
        <ReviewForm />
        <ReviewList getMenuItemName={getMenuItemName} />
      </div>
    </div>
  );
};

export default Reviews;
