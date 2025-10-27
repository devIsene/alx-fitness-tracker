import React from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, BarChart3, BookOpen, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // clear the current user
    navigate("/login"); // go back to login page
  };

  return (
    <div className="min-h-screen bg-cyan-500 flex flex-col items-center p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold">
          🏠 Fitness Tracker Dashboard
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-cyan-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {/* Log + History Button */}
        <button
          onClick={() => navigate("/logworkout")}
          className="bg-white text-cyan-600 font-semibold py-6 px-8 rounded-2xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 hover:bg-gray-100"
        >
          <Dumbbell size={40} className="mb-2" />
          Log & View Workouts
        </button>

        {/* Progress Button */}
        <button
          onClick={() => navigate("/progress")}
          className="bg-white text-cyan-600 font-semibold py-6 px-8 rounded-2xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 hover:bg-gray-100"
        >
          <BarChart3 size={40} className="mb-2" />
          View Progress
        </button>

        {/* Exercise Library */}
        <button
          onClick={() => navigate("/workout")}
          className="bg-white text-cyan-600 font-semibold py-6 px-8 rounded-2xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 hover:bg-gray-100"
        >
          <BookOpen size={40} className="mb-2" />
          Exercise Library
        </button>
      </div>

      {/* Motivational Quote */}
      <p className="mt-10 text-lg italic text-center max-w-2xl">
        "Success in the gym — and in life — comes from consistency, not perfection. 🏋️‍♂️"
      </p>
    </div>
  );
};

export default Dashboard;








