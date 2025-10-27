// src/pages/Progress.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Progress = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(saved);
  }, []);

  // Group workouts by exercise
  const exercises = [...new Set(workouts.map((w) => w.exercise))];

  // Prepare chart data
  const data = workouts.map((w) => ({
    name: `${w.date} - ${w.exercise}`,
    weight: parseFloat(w.weight),
    reps: parseInt(w.reps),
    sets: parseInt(w.sets),
  }));

  return (
    <div className="min-h-screen bg-[#E0F7FA] p-6 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Progress</h1>

      {workouts.length === 0 ? (
        <p className="text-gray-700 text-lg">
          No workout data yet. Log some workouts first!
        </p>
      ) : (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Progress Over Time
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-20} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#007BFF"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Weight (kg)"
              />
              <Line
                type="monotone"
                dataKey="reps"
                stroke="#00C49F"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Reps"
              />
              <Line
                type="monotone"
                dataKey="sets"
                stroke="#FF8042"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Sets"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Exercise Breakdown */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Exercises Tracked:
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              {exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;

