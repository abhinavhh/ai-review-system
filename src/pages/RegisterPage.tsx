import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Users {
  username: string;
  email: string;
  password: string;
}
const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<Users>({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', {
        formData
      });

      if(response.status === 201) {
        alert('User registered');
      }
      else {
        alert(response.data.message);
      }
      setLoading(false);
    }
    catch(err: any) {
      alert(err);
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
            autoComplete="true"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            autoComplete="true"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          </label>
          
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Loading...' : 'Create Account'}
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
