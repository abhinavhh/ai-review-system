import React, { useEffect, useState } from "react";
import type { Review } from "../interfaces/review.interface";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { Star } from "lucide-react";
import api from "../service/review.service";
import { Bounce, toast } from "react-toastify";

type SortOption = "top" | "recent" | "highest" | "lowest";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("top");

  const fetchReview = async () => {
    try {
      const response = await api.get("/reviews/");
      console.log(response.data);
      setReviews(response.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch revies", {
        position: "top-center",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview()
  }, [])
    

  const handleReviewAdded = () => {
    fetchReview();
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  // Sort reviews based on selected option
  const sortedReviews = React.useMemo(() => {
    const reviewsCopy = [...reviews];

    switch (sortBy) {
      case "recent":
        return reviewsCopy.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      case "highest":
        return reviewsCopy.sort(
          (a, b) => b.predicted_rating - a.predicted_rating
        );

      case "lowest":
        return reviewsCopy.sort(
          (a, b) => a.predicted_rating - b.predicted_rating
        );

      case "top":
      default:
        // Sort by helpful count (if available), then by rating, then by date
        return reviewsCopy.sort((a, b) => {
          // First by helpful count (descending)
          const helpfulDiff = (b.helpful || 0) - (a.helpful || 0);
          if (helpfulDiff !== 0) return helpfulDiff;

          // Then by rating (descending)
          const ratingDiff = b.predicted_rating - a.predicted_rating;
          if (ratingDiff !== 0) return ratingDiff;

          // Finally by date (most recent first)
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
    }
  }, [reviews, sortBy]);

  // Compute stats
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.predicted_rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.predicted_rating === star).length,
  }));

  if (loading) return <p className="text-center p-6">Loading reviews...</p>;

  return (
    <div className="mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      {/* left side → Form */}
      <div>
        <ReviewForm onReviewAdded={handleReviewAdded}/>
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
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="top">Top reviews</option>
            <option value="recent">Most recent</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
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
                      reviews.length > 0 ? (count / reviews.length) * 100 : 0
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
          {sortedReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
