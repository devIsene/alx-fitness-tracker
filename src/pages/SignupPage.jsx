import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("⚠️ All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setError("⚠️ Email already exists. Please log in instead.");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setError("");
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create Your Account 🏃‍♂️
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md">{error}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={handleLoginRedirect}
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;







