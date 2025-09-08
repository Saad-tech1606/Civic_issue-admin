import React, { useState } from "react";

export default function SignupPage({ onSignup, onSwitchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }
    if (onSignup) {
      onSignup({ fullName, email, password, department });
      // ✅ Show success pop-up
      alert(`✅ Account created successfully!\nName: ${fullName}\nEmail: ${email}\nDepartment: ${department}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          🏛 Official Registration
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Create your secure <span className="text-blue-400">CivicAdmin</span> account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Official Email (gov.in)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            required
          />

          {/* Department */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 transition-all outline-none"
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="Health">Health Department</option>
            <option value="Infrastructure">Infrastructure Department</option>
            <option value="Education">Education Department</option>
            <option value="Transport">Transport Department</option>
            <option value="Municipal">Municipal Administration</option>
          </select>

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500/30 transition-all outline-none"
            required
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="mt-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
          >
            Create Account
          </button>
        </form>

        {/* Switch to Login */}
        <p className="mt-6 text-gray-400 text-sm text-center">
          Already registered?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:underline"
          >
            Login Here
          </button>
        </p>
      </div>
    </div>
  );
}
