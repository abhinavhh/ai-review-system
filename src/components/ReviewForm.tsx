import React, { useState } from "react";
import type { Review } from "../interfaces/review.interface";
import api from "../service/review.service";

interface Props {
  onReviewAdded: (review: Review) => void;
}

const ReviewForm: React.FC<Props> = ({ onReviewAdded }) => {
  const [reviewText, setReviewText] = useState({ title: "", content: "" });
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  // Validation rules
  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required`;
    } else if (/[^a-zA-Z\s]/.test(value)) {
      error = `${name} cannot contain numbers or special characters`;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewText((prev) => ({
      ...prev,
      [name]: value,
    }));
    if(name === "content") validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    validateField("title", reviewText.title);
    validateField("content", reviewText.content);

    if (errors.title || errors.content) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No Token");
        setLoading(false);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onReviewAdded(response.data);
        setReviewText({ title: "", content: "" });
        setRating(5);
        alert(response.data.message || "Review Added");
      } else {
        alert(response.data.error || "Review adding Failed");
      }
    } catch (err: any) {
      alert(err.error || err.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Write a customer review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <input
            type="text"
            name="title"
            value={reviewText.title}
            onChange={handleChange}
            placeholder="Give your title"
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.title ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Content Field */}
        <div>
          <textarea
            className={`w-full px-3 py-2 border ${
              errors.content ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.content ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="What did you like or dislike? What did you use this product for?"
            name="content"
            value={reviewText.content}
            onChange={handleChange}
            rows={4}
            required
          />
          {errors.content && (
            <p className="text-sm text-red-600 mt-1">{errors.content}</p>
          )}
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
