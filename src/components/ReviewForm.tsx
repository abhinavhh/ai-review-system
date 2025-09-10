import React, { useState } from "react";
// import { Camera } from "lucide-react";
import type { Review } from "../interfaces/review.interface";
import api from "../service/review.service";

interface Props {
  onReviewAdded: (review: Review) => void;
}

const ReviewForm: React.FC<Props> = ({ onReviewAdded }) => {
  const [reviewText, setReviewText] = useState({
    title: "",
    content: "",
  });
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewText((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if(!token) {
        alert('No Token');
        setLoading(false);
        localStorage.removeItem('token')
        return;
      }
      const response = await api.post(
        "/reviews/",
        {
          title: reviewText.title,
          content: reviewText.content,
          rating: rating,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 201) {
        onReviewAdded(response.data);
        setRating(5);
        alert(response.data.message || "Review Added");
      } else {
        alert(response.data.error || "Review adding Failed");
      }
    } catch (err: any) {
      alert(err.error || err.response?.data?.message || "Failed to add review");
    } finally {
      reviewText.title = "";
      reviewText.content = "";
      setLoading(false);
    }

    // const newReview = await addReviewApi({
    //   author: "Guest User",
    //   rating: 4,
    //   title: reviewText.title,
    //   content: reviewText.description,
    //   verified: false,
    // });
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
          name="content"
          value={reviewText.content}
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
