// src/Admin/LoginPage.jsx
import React, { useState } from "react";

export default function LoginPage({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    // 🔑 Pass credentials back to parent
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Aesthetic Circles */}
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      {/* Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">🏛️</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Civic<span className="text-blue-400">Admin</span> Portal
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Authorized Government Officials Only
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Official Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 transition-all outline-none"
            required
          />

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
          >
            Secure Login
          </button>
        </form>

        {/* Switch to Signup */}
        <p className="mt-6 text-gray-400 text-sm text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-400 hover:underline"
          >
            Request Signup
          </button>
        </p>

        {/* Security Notice */}
        <p className="mt-4 text-gray-500 text-xs text-center">
          ⚠️ Unauthorized access is prohibited and may be subject to disciplinary action.
        </p>
      </div>
    </div>
  );
}
