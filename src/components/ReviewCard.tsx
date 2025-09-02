import React from "react";
import type { Review } from "../interfaces/review.interface";

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <div className="border rounded-xl p-4 shadow bg-white">
      <p className="text-gray-800 mb-2">{review.content}</p>
      <div className="text-yellow-500">
        {"⭐".repeat(review.rating)}
      </div>
    </div>
  );
};

export default ReviewCard;
