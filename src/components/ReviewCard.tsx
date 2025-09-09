import React from "react";
import { Star, CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react";
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
          className={`w-5 h-5 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="border-b border-gray-200 pb-6">
      {/* Author + avatar */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
          {review.author.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{review.author}</div>
          {review.verified && (
            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
              <CheckCircle className="w-3 h-3" />
              Verified Purchase
            </div>
          )}
        </div>
      </div>

      {/* Rating + title */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          {renderStars(review.rating)}
          <span className="font-medium text-gray-900">{review.title}</span>
        </div>
        <div className="text-sm text-gray-600">Reviewed on {review.date}</div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      {/* Actions */}
      {/* <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <ThumbsUp className="w-4 h-4" />
          Helpful ({review.helpful ?? 0})
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <ThumbsDown className="w-4 h-4" />
          Not helpful
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Report
        </button>
      </div> */}
    </div>
  );
};

export default ReviewCard;
