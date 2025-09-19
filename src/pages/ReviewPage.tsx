import React, { useEffect, useState } from "react";
import type { Review } from "../interfaces/review.interface";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { Star, TrendingUp, Filter, BarChart3 } from "lucide-react";
import api from "../service/review.service";
import { Bounce, toast } from "react-toastify";

type SortOption = "top" | "recent" | "highest" | "lowest";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const fetchReview = async () => {
    try {
      const response = await api.get("/reviews/");
      setReviews(response.data);
    } catch (err: any) {
      const errorData = err.response?.data;

      let errorMessage = "Failed to fetch reviews";

      if (errorData?.detail) {
        errorMessage = errorData.detail;
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }

      toast.error(errorMessage, {
        position: "top-center",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

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
      default:
        // Sort by helpful count (if available), then by rating, then by date
        return reviewsCopy.sort((a, b) => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {/* Left side → Form */}
      <div>
        <ReviewForm onReviewAdded={handleReviewAdded} />
      </div>
      
      {/* Right side → Reviews */}
      <div className="lg:col-span-2 px-8 md:px-0 flex flex-col">
        {/* Header with avg rating + filter */}
        <div className=" rounded-xl border border-none p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Rating Display */}
              <div className="text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {avgRating}
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-6 h-6 ${
                          s <= Math.round(Number(avgRating))
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>
            
            {/* Sort Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer min-w-[150px]"
                >
                  <option value="recent">Most recent</option>
                  <option value="highest">Highest rated</option>
                  <option value="lowest">Lowest rated</option>
                  <option value="top">Most helpful</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rating distribution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Rating Distribution</span>
            </div>
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-gray-700">{star}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        reviews.length > 0 ? (count / reviews.length) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="w-10 text-sm font-medium text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div className="space-y-6">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;