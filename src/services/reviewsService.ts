import { fetchAPI } from "../utils/fetch";
import { MenuResponse } from "../types/menuType";
export type Review = {
  id: string;
  menu_item_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewResponse = {
  data: Review[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

type ReviewRequest = {
  menuItemId: string;
  rating: number;
  comment: string;
};

export const ReviewsService = {
  getReviews: (): Promise<ReviewResponse> => {
    return fetchAPI<ReviewResponse>("/reviews");
  },

  createReview: (data: ReviewRequest) =>
    fetchAPI<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // GET Menu untuk Dropdown
  getMenuItems: () => fetchAPI<MenuResponse>("/menu?pageSize=100"),
};
