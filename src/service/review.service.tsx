import type { Review } from "../interfaces/review.interface";
import { reviews as initialReviews } from "../data/reviews.data";

let reviews: Review[] = [...initialReviews];

export const getReviews = async (): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(reviews), 500); // simulate API delay
  });
};

export const addReviewApi = async (
  review: Omit<Review, "id" | "date" | "helpful">
): Promise<Review> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview: Review = {
        ...review,
        id: (reviews.length + 1).toString(),
        date: new Date().toLocaleDateString(),
        helpful: 0,
      };
      reviews = [newReview, ...reviews];
      resolve(newReview);
    }, 500);
  });
};
