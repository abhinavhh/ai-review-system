import React, { useState } from "react";
import { reviews } from "../data/reviews.data";

const ReviewForm: React.FC = () => {
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reviews.push({
        id: (reviews.length + 1).toString(),
        author: "",
        rating: 3,
        title: "Demo",
        content: review,
        date: "",
        verified: false,
        helpful: 0,
    })
    alert(`Review submitted: ${review} (dummy, not saved)`);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-xl shadow">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
