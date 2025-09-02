import React from "react";

const Home: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Review Rating System</h1>
      <p className="text-gray-600">
        Submit your review and instantly see predicted star ratings powered by AI.
      </p>
    </div>
  );
};

export default Home;
