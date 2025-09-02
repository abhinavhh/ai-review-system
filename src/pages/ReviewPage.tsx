import React from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import { reviews } from "../data/reviews.data";
const ReviewPage: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
      <ReviewForm />
      { reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
      
    </div>
  );
};

export default ReviewPage;
