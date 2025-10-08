import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, BarChart3, LogOut, Footprints, Flame, Timer } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#E0F7FA] flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, Isene! 💪
        </h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center">
          <LogOut className="mr-2" size={18} /> Logout
        </button>
      </div>

      {/* Fitness Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-5xl">
        {/* Daily Steps */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <Footprints className="mx-auto text-blue-500 mb-2" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800">7,842</h2>
          <p className="text-gray-500">Daily Steps</p>
        </div>

        {/* Calories Burned */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <Flame className="mx-auto text-orange-500 mb-2" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800">540 kcal</h2>
          <p className="text-gray-500">Calories Burned</p>
        </div>

        {/* Active Minutes */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <Timer className="mx-auto text-green-500 mb-2" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800">62</h2>
          <p className="text-gray-500">Active Minutes</p>
        </div>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <Dumbbell className="mx-auto text-purple-500 mb-2" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800">12</h2>
          <p className="text-gray-500">Workouts Completed</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <BarChart3 className="mx-auto text-teal-500 mb-2" size={40} />
          <h2 className="text-2xl font-semibold text-gray-800">85%</h2>
          <p className="text-gray-500">Weekly Progress</p>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link
          to="/workout"
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transform transition"
        >
          <Dumbbell size={40} className="mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Add Workout</h2>
        </Link>

        <Link
          to="/progress"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transform transition"
        >
          <BarChart3 size={40} className="mx-auto mb-3" />
          <h2 className="text-xl font-semibold">View Progress</h2>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;




