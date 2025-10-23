// src/api/wgerApi.js

const BASE_URL = "https://wger.de/api/v2";

// ✅ Fetch muscles (for dropdown)
export const fetchMuscles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/muscle/?limit=50`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching muscles:", error);
    return [];
  }
};

// ✅ Fetch exercises with search + filter + descriptions + images
export const fetchExercises = async (search = "", muscle = "") => {
  try {
    // Only approved, English-language exercises
    let url = `${BASE_URL}/exercise/?language=2&status=2&limit=200`;

    if (muscle) {
      url += `&muscle=${muscle}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // 🔍 Filter by search (case-insensitive, handles "push up" or "push-up")
    const normalizedSearch = search.toLowerCase().replace(/\s+/g, "-");
    let exercises = data.results.filter((ex) =>
      ex.name.toLowerCase().includes(normalizedSearch)
    );

    // 🧹 Keep only exercises that have a visible description
    exercises = exercises.filter(
      (ex) => ex.description && ex.description.trim() !== ""
    );

    // 🖼️ Fetch exercise images separately
    const imageResponse = await fetch(`${BASE_URL}/exerciseimage/?limit=500`);
    const imageData = await imageResponse.json();

    // 🧩 Attach matching images to exercises
    const exercisesWithImages = exercises.map((exercise) => {
      const image = imageData.results.find(
        (img) => img.exercise === exercise.id
      );
      return {
        ...exercise,
        image: image ? image.image : null,
      };
    });

    return exercisesWithImages;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};



