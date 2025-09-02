import axios from "axios";

import type { Review } from "../interfaces/review.interface";

const apiUrl = "http://localhost:5000/reviews";

export const getRevies = async(): Promise<Review> => {
    const res = await axios.get(apiUrl);
    return res.data;
}

export const addReviewApi = async (review: Omit<Review, "id">) => {
  const res = await axios.post(apiUrl, review);
  return res.data;
};