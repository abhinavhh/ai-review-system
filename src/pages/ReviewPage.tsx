import React, { useEffect, useState } from "react";
import { getReviews } from "../service/review.service";
import type { Review } from "../interfaces/review.interface";
import ReviewCard from "../components/ReviewCard";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center p-6">Loading reviews...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Top reviews</h2>
        <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Top reviews</option>
          <option>Most recent</option>
          <option>Highest rated</option>
          <option>Lowest rated</option>
        </select>
      </div>

      <div className="space-y-6">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      <div className="mt-8">
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          See all reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
