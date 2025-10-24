import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExercises, fetchMuscles } from "../api/wgerApi";

export default function Workout() {
  const [exercises, setExercises] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const muscleData = await fetchMuscles();
        setMuscles(muscleData);
        
        const exerciseData = await fetchExercises();
        setExercises(exerciseData);
        
        console.log("Loaded exercises:", exerciseData); // Debug
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = async (searchTerm = search, muscleTerm = selectedMuscle) => {
    try {
      setLoading(true);
      setError(null);
      const filtered = await fetchExercises(searchTerm, muscleTerm);
      setExercises(filtered);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-search with debounce (waits 500ms after typing stops)
  const handleSearchInput = (value) => {
    setSearch(value);
    
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      handleSearch(value, selectedMuscle);
    }, 500);
    
    setDebounceTimer(timer);
  };

  // Strip HTML tags for preview
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-cyan-500 p-5">
      <h1 className="text-center text-white text-4xl font-bold mb-6">
        💪 Workout Exercises
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => handleSearchInput(e.target.value)}
          className="px-4 py-2 rounded-lg w-64 border-2 border-white focus:outline-none focus:border-blue-300"
        />
        <select
          value={selectedMuscle}
          onChange={(e) => {
            setSelectedMuscle(e.target.value);
            handleSearch(search, e.target.value);
          }}
          className="px-4 py-2 rounded-lg border-2 border-white focus:outline-none"
        >
          <option value="">All Muscles</option>
          {muscles.map((muscle) => (
            <option key={muscle.id} value={muscle.id}>
              {muscle.name_en || muscle.name}
            </option>
          ))}
        </select>
        <button 
          onClick={() => handleSearch()}
          className="px-6 py-2 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-600 bg-white p-4 rounded-lg max-w-md mx-auto mb-4">
          {error}
        </div>
      )}

      {/* Loading Message */}
      {loading && (
        <p className="text-center text-white text-xl mt-8">
          Loading exercises...
        </p>
      )}

      {/* Exercises Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        {!loading && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-center font-bold text-lg mb-3 text-gray-800">
                {exercise.name}
              </h3>
              
              {exercise.image ? (
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              
              <div className="text-sm text-gray-600 line-clamp-3">
                {stripHtml(exercise.description).substring(0, 150)}...
              </div>
              
              {exercise.category && (
                <div className="mt-3 text-xs text-cyan-600 font-semibold">
                  Category: {exercise.category}
                </div>
              )}
            </div>
          ))
        ) : (
          !loading && (
            <div className="col-span-full text-center text-white text-xl">
              No exercises found 😢
            </div>
          )
        )}
      </div>
    </div>
  );
}





