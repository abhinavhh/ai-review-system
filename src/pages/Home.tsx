import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Review Rating System</h1>
      <p className="text-gray-600">
        Submit your review and instantly see predicted star ratings powered by AI.
      </p>
      <Link to="/reviews">
        <button className="bg-yellow-400 p-2 rounded-xl mt-2 ">Submit a Review</button>
      </Link>
      
      {/* <Reviews /> */}
    </div>
  );
};

export default Home;
