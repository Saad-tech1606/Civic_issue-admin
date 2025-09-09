import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (onSignup) onSignup({ name, email, password });
    navigate("/"); // Redirect to landing page after signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Aesthetic Circles */}
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      {/* Glassmorphic Signup Card */}
      <div className="relative w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 z-10">
        {/* User Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">👤</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create <span className="text-blue-400">Account</span>
        </h1>
        <p className="text-gray-300 text-center mb-6 text-base">
          Sign up to access your personalized dashboard
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none text-base"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 transition-all outline-none text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none text-base"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 transition-all outline-none text-base"
            required
          />

          <button
            type="submit"
            className="mt-2 py-3 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-gray-300 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/user/Userlogin")}
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        </p>

        <p className="mt-4 text-yellow-400 text-xs text-center flex items-center justify-center gap-1">
          <span className="text-lg">⚠️</span>
          Please use a strong password to keep your account secure.
        </p>
      </div>
    </div>
  );
}
