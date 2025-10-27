// src/pages/LogWorkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogWorkout = () => {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  // Load saved workouts from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(saved);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!exercise || !sets || !reps || !weight || !date) {
      alert("Please fill in all fields!");
      return;
    }

    const newWorkout = {
      id: Date.now(),
      exercise,
      sets,
      reps,
      weight,
      date,
    };

    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

    // Clear input fields
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setDate("");
  };

  // Handle delete workout
  const handleDelete = (id) => {
    const updated = workouts.filter((w) => w.id !== id);
    setWorkouts(updated);
    localStorage.setItem("workouts", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#E0F7FA] flex flex-col items-center p-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Log Your Workout
      </h1>

      {/* Workout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Exercise name"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Workout
        </button>
      </form>

      {/* Workout History */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Workout History
        </h2>

        {workouts.length === 0 ? (
          <p className="text-gray-600">No workouts logged yet.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">Exercise</th>
                <th className="p-3 text-left">Sets</th>
                <th className="p-3 text-left">Reps</th>
                <th className="p-3 text-left">Weight</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{workout.exercise}</td>
                  <td className="p-3">{workout.sets}</td>
                  <td className="p-3">{workout.reps}</td>
                  <td className="p-3">{workout.weight} kg</td>
                  <td className="p-3">{workout.date}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LogWorkout;

