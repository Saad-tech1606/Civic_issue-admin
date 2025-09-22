// src/User/UserLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import axios from "axios";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://backend-civic.onrender.com/user/user_all", // ✅ login API
        { email, password }
      );

      if (res.data.auth === "success") {
        console.log("✅ User logged in:", res.data);
        alert("Login successful!");
        navigate("/user/dashboard"); // ✅ redirect on success
      } else {
        setError(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] -top-40 -left-40 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute w-[700px] h-[700px] -bottom-60 -right-40 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex z-10">
        {/* Left panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600/40 to-purple-600/40 items-center justify-center p-10 relative">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg mb-6">
              <span className="text-white text-4xl">🏛️</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome Back, User!
            </h2>
            <p className="text-gray-200 text-base max-w-xs mx-auto">
              Manage civic issues, track reports, and oversee the community
              dashboard securely.
            </p>
          </div>
          <div className="absolute bottom-5 right-5 text-gray-400 text-xs">
            © 2025 Civic
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-white text-center mb-2">
            Civic<span className="text-blue-400">User</span> Portal
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
              <input
                type="email"
                placeholder="Official Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none text-base"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3.5 left-4 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 transition-all outline-none text-base"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Options */}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-blue-500" />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="mt-2 py-3 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg"
            >
              Secure Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <hr className="flex-1 border-gray-700" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-700" />
            </div>

            {/* Google login */}
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-3 w-full bg-red-600/90 hover:bg-red-700 text-white font-medium rounded-xl shadow-lg transition-all"
            >
              <FaGoogle /> Login with Google
            </button>
          </form>

          {/* Signup option */}
          <p className="mt-6 text-gray-300 text-sm text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/user/signup")}
              className="text-blue-400 hover:underline"
            >
              Request Signup
            </button>
          </p>

          {/* Warning */}
          <p className="mt-4 text-yellow-400 text-xs text-center flex items-center justify-center gap-1">
            <span className="text-lg">⚠️</span>
            Unauthorized access is prohibited and may be subject to disciplinary
            action.
          </p>
        </div>
      </div>
    </div>
  );
}
