import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Users {
  email: string;
  password: string;
}
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<Users>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successfull");
      } else {
        alert(response.data.message);
      }
      setLoading(false);
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
      setLoading(false);
    }
    // TODO: call login API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow border mt-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Sign In
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-0 focus:border-black"
            />
          </label>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-0 focus:border-black"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      {/* Link to Register */}
      <p className="text-sm text-gray-600 mt-6 text-center">
        New here?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Create your account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
