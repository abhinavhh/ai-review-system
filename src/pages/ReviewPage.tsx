import React, { useEffect, useState } from "react";
import { getReviews } from "../service/review.service";
import type { Review } from "../interfaces/review.interface";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { Star } from "lucide-react";
// import axios from "axios";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try{
  //       setLoading(true);
  //       const response = await axios.get('/api/get-reviews');
  //       setReviews(response.data);
  //     }
  //     catch(err: any) {
  //       alert(err.response?.data?.message || err.message);
  //     }

  //     finally {
  //       setLoading(false);
  //     }
  //   }
    
  //   fetchReviews();
  // }, []);

  const handleReviewAdded = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  // Compute stats
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  if (loading) return <p className="text-center p-6">Loading reviews...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* left side → Form */}
      <div>
        <ReviewForm onReviewAdded={handleReviewAdded} />
      </div>
      {/* Right side → Reviews */}
      <div className="lg:col-span-2">
        {/* Header with avg rating + filter */}
        <div className="flex items-start justify-between mb-8 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {avgRating}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= Math.round(Number(avgRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Based on {reviews.length} reviews
            </p>
          </div>
          {/* <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Top reviews</option>
            <option>Most recent</option>
            <option>Highest rated</option>
            <option>Lowest rated</option>
          </select> */}
        </div>

        {/* Rating distribution */}
        <div className="mb-6">
          {ratingCounts.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2 mb-2">
              <span className="w-12 text-sm text-gray-600">{star} star</span>
              <div className="flex-1 h-3 bg-gray-200 rounded">
                <div
                  className="h-3 bg-yellow-400 rounded"
                  style={{
                    width: `${
                      reviews.length > 0
                        ? (count / reviews.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="w-12 text-sm text-gray-600">{count}</span>
            </div>
          ))}
        </div>

        {/* Reviews list */}
        <div className="space-y-6">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
