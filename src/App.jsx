import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Workout from "./pages/Workout.jsx";
import Progress from "./pages/Progress.jsx";
import LogWorkout from "./pages/LogWorkout.jsx"; // ✅ Add this import

// Layout Wrapper
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div
      className={`min-h-screen ${
        isAuthPage
          ? "bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center"
          : "bg-[#E0F7FA]"
      }`}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Main App Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/logworkout" element={<LogWorkout />} /> {/* ✅ Added route */}
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;








