import { useEffect, useState } from "react";
import { fetchExercises, fetchMuscles } from "../api/wgerApi";

export default function Workout() {
  const [exercises, setExercises] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const muscleData = await fetchMuscles();
      setMuscles(muscleData);
      const exerciseData = await fetchExercises();
      setExercises(exerciseData);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const filtered = await fetchExercises(search, selectedMuscle);
    setExercises(filtered);
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "aqua", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "white" }}>💪 Workout Exercises</h1>

      {/* Search and Filter */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", width: "200px" }}
        />
        <select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          <option value="">All Muscles</option>
          {muscles.map((muscle) => (
            <option key={muscle.id} value={muscle.id}>
              {muscle.name_en || muscle.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} style={{ padding: "10px", borderRadius: "8px" }}>
          Search
        </button>
      </div>

      {/* Loading Message */}
      {loading && <p style={{ textAlign: "center", marginTop: "20px" }}>Loading exercises...</p>}

      {/* Exercises Display */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {!loading && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ textAlign: "center" }}>{exercise.name}</h3>
              {exercise.image ? (
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                />
              ) : (
                <p style={{ textAlign: "center", color: "gray" }}>No image available</p>
              )}
              <p
                style={{ marginTop: "10px", fontSize: "14px" }}
                dangerouslySetInnerHTML={{ __html: exercise.description }}
              />
            </div>
          ))
        ) : (
          !loading && <p style={{ textAlign: "center" }}>No exercises found 😢</p>
        )}
      </div>
    </div>
  );
}









