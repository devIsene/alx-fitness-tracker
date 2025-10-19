import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#E0F7FA] flex flex-col items-center p-6 text-gray-800">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏋️‍♂️ Fitness Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Daily Steps</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">8,250</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Calories Burned</h2>
          <p className="text-3xl font-bold text-orange-500 mt-2">540 kcal</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Active Minutes</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">65 min</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-6 mb-10">
        <Link
          to="/workout"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition shadow-md"
        >
          🏋️‍♀️ Workouts
        </Link>
        <Link
          to="/progress"
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition shadow-md"
        >
          📊 Progress
        </Link>
      </div>

      {/* Motivational Quote */}
      <p className="text-xl italic font-medium text-gray-700 text-center max-w-2xl">
        “Discipline is doing what needs to be done, even when you don’t feel like it.”
      </p>
    </div>
  );
};

export default Dashboard;








