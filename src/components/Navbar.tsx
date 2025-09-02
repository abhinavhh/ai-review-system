import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-700 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Review Rating System</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/review" className="hover:underline">Submit</Link>
        <Link to="/reviews" className="hover:underline">Reviews</Link>
      </div>
    </nav>
  );
};

export default Navbar;
