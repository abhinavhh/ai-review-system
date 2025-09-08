import React, { useState } from "react";
// import { Camera } from "lucide-react";
import { addReviewApi } from "../service/review.service";
import type { Review } from "../interfaces/review.interface";

interface Props {
  onReviewAdded: (review: Review) => void;
}

const ReviewForm: React.FC<Props> = ({ onReviewAdded }) => {
  const [reviewText, setReviewText] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  {
    const { name, value } = e.target;
    setReviewText(prev => ({
      ...prev, 
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send the review to the backend and get the rating.

    const newReview = await addReviewApi({
      author: "Guest User",
      rating: 4,
      title: reviewText.title,
      content: reviewText.description,
      verified: false,
    });
    reviewText.description = "";
    reviewText.title = "";
    onReviewAdded(newReview);
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Write a customer review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="title" 
          value={reviewText.title}
          onChange={handleChange}
          placeholder="Give your title" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="What did you like or dislike? What did you use this product for?"
          name="description"
          value={reviewText.description}
          onChange={handleChange}
          rows={4}
          required
        />

        <div>
          {/* <button
            type="button"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
          >
            <Camera className="w-4 h-4" />
            Add a photo or video
          </button> */}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
