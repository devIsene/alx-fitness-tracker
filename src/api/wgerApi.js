// src/api/wgerApi.js
const BASE_URL = "https://wger.de/api/v2";

// ✅ Fetch muscles (for dropdown)
export const fetchMuscles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/muscle/?limit=100`);
    const data = await response.json();
    console.log("✅ Muscles fetched:", data.results?.length || 0);
    return data.results || [];
  } catch (error) {
    console.error("❌ Error fetching muscles:", error);
    return [];
  }
};

// ✅ Fetch exercises (with descriptions + images + filters)
export const fetchExercises = async (searchTerm = "", muscle = "") => {
  try {
    console.log("🔍 Fetching exercises for term:", searchTerm);

    // Fetch exercises (only English language)
    let url = `${BASE_URL}/exercise/?limit=100&language=2`;
    if (muscle) {
      url += `&muscles=${muscle}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log("🌍 API Response:", data);

    if (!data.results || !Array.isArray(data.results)) {
      console.error("❌ Unexpected data format:", data);
      return [];
    }

    let exercises = data.results;

    // ✅ Filter safely by search term (case-insensitive)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      exercises = exercises.filter((ex) => {
        return ex.name && ex.name.toLowerCase().includes(term);
      });
    }

    // ✅ Fetch exercise images separately
    const imagesResponse = await fetch(`${BASE_URL}/exerciseimage/?limit=200`);
    const imagesData = await imagesResponse.json();

    const imageMap = {};
    if (imagesData.results && Array.isArray(imagesData.results)) {
      imagesData.results.forEach((img) => {
        if (!imageMap[img.exercise]) {
          imageMap[img.exercise] = img.image;
        }
      });
    }

    // ✅ Combine exercises with images and fallback values
    const processedExercises = exercises.map((ex) => ({
      id: ex.id,
      name: ex.name || "Unnamed Exercise",
      description: ex.description || "No description available.",
      category: ex.category?.name || "General",
      muscles: ex.muscles || [],
      image: imageMap[ex.id] || null,
    }));

    console.log("✅ Final exercises count:", processedExercises.length);
    return processedExercises;
  } catch (error) {
    console.error("❌ Error fetching exercises:", error);
    return [];
  }
};







