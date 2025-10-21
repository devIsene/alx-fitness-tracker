import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Workout = () => {
  const navigate = useNavigate();

  // ✅ Updated and ordered exercise list
  const exercises = [
    // 🏋️‍♂️ Upper Body
    {
      name: "Push Ups",
      category: "Upper Body",
      image: "/images/pushups.jpg",
    },
    {
      name: "Bench Press",
      category: "Upper Body",
      image: "/images/benchpress.jpg",
    },

    // 🦵 Lower Body
    {
      name: "Squats",
      category: "Lower Body",
      image: "/images/squats.jpg",
    },
    {
      name: "Lunges",
      category: "Lower Body",
      image: "/images/lunges.jpg",
    },

    // 💪 Arms
    {
      name: "Bicep Curls",
      category: "Arms",
      image: "/images/bicepcurl.jpg",
    },
    {
      name: "Tricep Dips",
      category: "Arms",
      image: "/images/tricepdips.jpg",
    },

    // 🦿 Legs
    {
      name: "Leg Press",
      category: "Legs",
      image: "/images/legpress.jpg",
    },
    {
      name: "Calf Raises",
      category: "Legs",
      image: "/images/calfraises.jpg",
    },

    // 🧘 Core
    {
      name: "Plank",
      category: "Core",
      image: "/images/plank.jpg",
    },
    {
      name: "Russian Twists",
      category: "Core",
      image: "/images/russiantwist.jpg",
    },

    // ⚡ Full Body
    {
      name: "Burpees",
      category: "Full Body",
      image: "/images/burpees.jpg",
    },
    {
      name: "Mountain Climbers",
      category: "Full Body",
      image: "/images/mountainclimbers.jpg",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredExercises =
    selectedCategory === "All"
      ? exercises
      : exercises.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-indigo-700 hover:text-indigo-900 mb-6"
      >
        <ArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      {/* 🏋️ Title */}
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
        Workout Library 🏋️
      </h1>

      {/* 🧭 Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["All", "Upper Body", "Lower Body", "Arms", "Legs", "Core", "Full Body"].map(
          (category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* 🧩 Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="rounded-xl w-full h-48 object-cover mb-3"
              onError={(e) => (e.target.src = "/images/default.jpg")} // fallback if missing
            />
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {exercise.name}
            </h3>
            <p className="text-gray-500 text-sm mb-3">{exercise.category}</p>

            {/* 🧮 Input Fields */}
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                placeholder="Sets"
                className="w-1/3 border border-gray-300 rounded-lg p-2 text-sm"
              />
              <input
                type="number"
                placeholder="Reps"
                className="w-1/3 border border-gray-300 rounded-lg p-2 text-sm"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                className="w-1/3 border border-gray-300 rounded-lg p-2 text-sm"
              />
            </div>

            {/* ➕ Add Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Add to Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;




