import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Users {
  username: string;
  email: string;
  phone_number: number;
  password: string;
  confirmPassword: string;
}
const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<Users>({
    username: "",
    email: "",
    phone_number: 0,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function checkPasswordFormat(password: string) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPasswordFormat(formData.password)) {
      alert("Password Format Error. Please Enter a Secure Password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Password do not match");
      return;
    }
    if (formData.username.trim().length === 0) {
      alert("Name is empty");
      return;
    }
    try {
      setLoading(true);
      const { username, email, password, phone_number } = formData; 
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username, email, password, phone_number
      });

      if (response.status === 201) {
        alert("User registered");
      } else {
        alert(response.data.message);
      }
      setLoading(false);
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Something Went Wrong");
      setLoading(false);
    }
    // TODO: call register API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow border mt-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Create Account
      </h1>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-0 focus:border-black"
            />
          </label>
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number:
            <input
              type="number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-0 focus:border-black"
            />
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-0 focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7"
            >
              {showPassword ? (
                <EyeOff className="text-gray-400" />
              ) : (
                <Eye className="text-gray-500" />
              )}
            </button>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
          {loading ? "Loading..." : "Create Account"}
        </button>
      </form>

      {/* Link to Login */}
      <p className="text-sm text-gray-600 mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
