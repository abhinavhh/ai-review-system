import React, { useState } from "react";
// import type { Review } from "../interfaces/review.interface";
import api from "../service/review.service";
import { Bounce, toast } from "react-toastify";
import { Shield } from "lucide-react";

interface Props {
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<Props> = ({ onReviewAdded }) => {
  const [reviewText, setReviewText] = useState({
    name: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    title?: string;
    content?: string;
  }>({});

  // Validation rules
  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required`;
    } else if (/[^a-zA-Z.,\s]/.test(value)) {
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
    if (name === "content") validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateField("title", reviewText.name);
    validateField("title", reviewText.title);
    validateField("content", reviewText.content);

    if (errors.title || errors.content || errors.name) {
      toast.warning("Please fix validation errors before submitting.", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token created", {
          position: "top-center",
          transition: Bounce,
        });
        alert("No Token");
        setLoading(false);
        return;
      }
      console.log(reviewText);
      const response = await api.post(
        "/reviews/",
        {
          name: reviewText.name,
          title: reviewText.title,
          content: reviewText.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setReviewText({ name: "", title: "", content: "" });
        setErrors({});
        toast.success(response.data.message || "Review Added Successfully", {
          position: "top-center",
        });
      }
      onReviewAdded();
    } catch (err: any) {
      const errorData = err.response?.data;

      let errorMessage = "Failed to add review";

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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
      <div className="mb-6 sm:mb-8 max-w-6xl">
        <div className="lg:block flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Verified & AI-Analyzed</span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Share your experiences and discover insights from our AI-powered
          review analysis system.
        </p>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Write a customer review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <input
            type="text"
            name="name"
            value={reviewText.name}
            onChange={handleChange}
            placeholder="Give your name"
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

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
