import React from "react";
import { Star, CheckCircle } from "lucide-react";
import type { Review } from "../interfaces/review.interface";

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow duration-200">
      {/* Author + Avatar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{review.name}</div>
          {review.verified && (
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <CheckCircle className="w-3 h-3" />
              Verified Purchase
            </div>
          )}
        </div>
      </div>

      {/* Rating + Title */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          {renderStars(review.predicted_rating)}
          <span className="font-medium text-gray-900">{review.title}</span>
        </div>
        <div className="text-xs text-gray-500">
          Reviewed on {new Date(review.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed">{review.content}</p>
      {review.predicted_sentiment === "4" ||
      review.predicted_sentiment === "5" ? (
        <p className="font-bold  text-xs font pt-2">Positive</p>
      ) : review.predicted_sentiment === "NEUTRAL" ? (
        <p className="font-bold  text-xs font pt-2">Neutral</p>
      ) : (
        <p className="font-bold  text-xs font pt-2">Negative</p>
      )}

      {/* Optional Actions (Commented Out) */}
      {/* <div className="flex items-center gap-4 mt-3 text-gray-600 text-sm">
        <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
          <ThumbsUp className="w-4 h-4" />
          Helpful ({review.helpful ?? 0})
        </button>
        <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
          <ThumbsDown className="w-4 h-4" />
          Not helpful
        </button>
        <button className="hover:text-gray-900 transition-colors">
          Report
        </button>
      </div> */}
    </div>
  );
};

export default ReviewCard;
