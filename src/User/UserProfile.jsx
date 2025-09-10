import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", raised: 40, resolved: 30 },
  { month: "Feb", raised: 55, resolved: 45 },
  { month: "Mar", raised: 30, resolved: 20 },
  { month: "Apr", raised: 50, resolved: 35 },
  { month: "May", raised: 60, resolved: 50 },
  { month: "Jun", raised: 45, resolved: 40 },
  { month: "Jul", raised: 55, resolved: 42 },
  { month: "Aug", raised: 70, resolved: 60 },
  { month: "Sep", raised: 65, resolved: 55 },
  { month: "Oct", raised: 80, resolved: 70 },
  { month: "Nov", raised: 50, resolved: 40 },
  { month: "Dec", raised: 75, resolved: 65 },
];

export default function ProfileOverview() {
  const navigate = useNavigate();

  const handleGoToLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0d0f25] via-[#151933] to-[#090d1a] text-white font-sans select-none">     {/* Top bar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/10">
        <input
          type="text"
          placeholder="Search topics..."
          className="px-5 py-3 rounded-3xl bg-[#1a1f3d]/70 placeholder-gray-400 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600 w-96"
        />
        <div className="flex items-center space-x-6">
          <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🔔</span>
          <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">💬</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-12 h-12 rounded-full border-4 border-blue-500/50 shadow-lg"
          />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-10 animate-fadeIn">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#1b1f3c]/80 to-[#0f1329]/90 rounded-3xl p-10 shadow-xl border border-white/10 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold tracking-wide mb-2">Anonymus 369</h2>
          <p className="text-blue-300 font-medium text-sm mb-8">Your Identity is confidential</p>
          <div className="w-full text-left">
            <h3 className="text-white text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-300 text-base">
              Lives in <span className="text-blue-400 font-semibold">Jharkhand, India</span>
            </p>
          </div>
        </div>

        {/* Chart Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#20244f]/90 to-[#151933]/80 rounded-3xl p-10 shadow-xl border border-white/10">
          <h2 className="text-2xl font-extrabold mb-6 text-white/90 drop-shadow-lg">
            Issues Raised vs Resolved
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#b0b9ff" tick={{ fontSize: 13, fill: "#a5b0ffaa" }} />
              <YAxis stroke="#b0b9ff" tick={{ fontSize: 14, fill: "#a5b0ffaa" }} />
              <Tooltip
                cursor={{ fill: "#2b2e4d" }}
                contentStyle={{ backgroundColor: "#181c3b", borderRadius: 8, border: "none" }}
                itemStyle={{ color: "#e0e6ff" }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Bar dataKey="raised" fill="#6366f1" radius={[5, 5, 0, 0]} barSize={20} />
              <Bar dataKey="resolved" fill="#22d3ee" radius={[5, 5, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 mt-4 mb-12 animate-fadeIn delay-100">
        {[
          { value: "1,250", label: "Points Redeemed", colorClass: "text-blue-400" },
          { value: "32", label: "Issues Reported This Month", colorClass: "text-cyan-400" },
          { value: "320 / 280", label: "Issues Raised / Resolved", colorClass: "text-green-400" },
        ].map(({ value, label, colorClass }, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-tr from-[#1a1f3d]/80 to-[#11152d]/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-lg text-center transition hover:scale-[1.03] hover:shadow-2xl cursor-default"
          >
            <h2 className={`text-4xl font-extrabold ${colorClass} drop-shadow-md select-text`}>{value}</h2>
            <p className="text-gray-300 text-lg mt-3 font-semibold">{label}</p>
          </div>
        ))}
      </div>

      {/* Go to Landing Page Button */}
      <div className="flex justify-center mb-12 animate-fadeIn delay-200">
        <button
          onClick={handleGoToLanding}
          className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-700 text-white text-xl font-extrabold shadow-xl hover:scale-110 hover:shadow-3xl transition-transform"
        >
          Home Page
        </button>
      </div>

      {/* FadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.55s ease forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
