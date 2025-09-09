
import React, { useState } from "react";
import { Link } from "react-router-dom";
import potholeImg from "../assets/pothole.avif";
import garbageImg from "../assets/garbage.jpg";
import streetlightImg from "../assets/streetlight.webp";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdPerson,
  MdReportProblem,
  MdTrendingUp,
  MdLocationCity,
  MdTrackChanges,
  MdRedeem,
  MdSettings,
  MdContactMail,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { FaRegCommentDots, FaRegBell } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

// Recharts imports
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

export default function LandingPage() {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const civicImages = [
    { id: 1, src: potholeImg, title: "Report Potholes" },
    { id: 2, src: garbageImg, title: "Clean Neighbourhood" },
    { id: 3, src: streetlightImg, title: "Fix Streetlights" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f1923] text-white">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-[#131d29] border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center px-6 pt-6 pb-3">
            <span className="bg-blue-600 rounded-lg p-2 mr-3 shadow-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                <rect x="8" y="8" width="8" height="8" fill="#fff" />
              </svg>
            </span>
            <span className="text-2xl font-extrabold tracking-wide text-white">
              Civicitizen
            </span>
          </div>
          <div className="px-6 text-xs text-gray-400 mt-2 mb-2">PAGES</div>
          <nav>
            <ul className="space-y-1 px-2">
              {[
                { to: "/user/dashboard", icon: <MdDashboard />, label: "Dashboard" },
                { to: "/user/profile", icon: <MdPerson />, label: "Profile Overview" },
                { to: "/user/report", icon: <MdReportProblem />, label: "Report Issue" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-[#1d2a36] hover:text-white transition-all"
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}

              {/* Analytics Dropdown */}
              <li>
                <button
                  onClick={() => setAnalyticsOpen((v) => !v)}
                  className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-[#1d2a36] hover:text-white transition-all focus:outline-none"
                >
                  <MdTrendingUp className="w-5 h-5 mr-3" /> Analytics
                  <span className="ml-auto">
                    {analyticsOpen ? <MdExpandLess /> : <MdExpandMore />}
                  </span>
                </button>
                {analyticsOpen && (
                  <ul className="ml-8 mt-1 mb-1 space-y-1">
                    <li>
                      <Link
                        to="/user/analytics"
                        className="flex items-center p-2 text-gray-400 hover:text-white hover:bg-[#1d2a36] rounded transition"
                      >
                        <MdLocationCity className="w-4 h-4 mr-2" />
                        Local
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {[
                { to: "/user/track", icon: <MdTrackChanges />, label: "Track Status" },
                { to: "/user/redeem", icon: <MdRedeem />, label: "Redeem Points" },
                { to: "/user/settings", icon: <MdSettings />, label: "Settings" },
                { to: "/user/contact", icon: <MdContactMail />, label: "Contact Us" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-[#1d2a36] hover:text-white transition-all"
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-700 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            <MdPerson className="w-8 h-8" />
          </div>
          <div>
            <div className="font-semibold text-white">Arun Sharma</div>
            <div className="text-sm text-gray-400">arun.sharma@email.com</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] z-50 bg-[#131d29] border-b border-gray-800 px-6 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center w-1/3">
            <div className="relative w-full">
              <span className="absolute left-3 top-2 text-gray-400">🔍</span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1c2836] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search topics..."
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <Link to="/messages" className="relative group">
              <FaRegCommentDots size={22} className="text-gray-300 group-hover:text-blue-400 transition" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-1.5">
                3
              </span>
            </Link>
            <Link to="/notifications" className="relative group">
              <FaRegBell size={22} className="text-gray-300 group-hover:text-blue-400 transition" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full text-xs px-1.5">
                7
              </span>
            </Link>

            {/* Login Buttons */}
            <Link
              to="/User/Userlogin"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition shadow"
            >
              User Login
            </Link>
            <Link
              to="/Admin/LoginPage"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition shadow"
            >
              Admin Login
            </Link>
            <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-gray-200">
              <ReactCountryFlag
                countryCode="IN"
                svg
                style={{ width: "1.8em", height: "1.8em" }}
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-green-500"></div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 mt-20 px-8 py-6 overflow-y-auto">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 text-white"
          >
            Civic Issue Reporting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-400 mb-10 max-w-3xl"
          >
            Report, track, and resolve issues in your community with ease.
          </motion.p>

          {/* Civic Issue Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {civicImages.map((img) => (
              <motion.div
                key={img.id}
                onMouseEnter={() => setHovered(img.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-xl overflow-hidden bg-[#1c2836] shadow-lg cursor-pointer transition hover:shadow-xl"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full h-56 object-cover transform transition duration-500 ${
                    hovered === img.id ? "brightness-110 scale-105" : ""
                  }`}
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 text-center py-2 text-white text-lg font-medium">
                  {img.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart + Profile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile */}
            <div className="bg-[#1c2836] rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <h3 className="text-lg font-semibold mb-2">About Jharkhand</h3>
              <p className="text-gray-400 text-sm">
                Jharkhand ("The land of forest") is a State in eastern India, created on 15 November 2000, from what was previously the southern half of Bihar.The State shares its border with the States of Bihar to the north, Uttar Pradesh to the northwest, Chhattisgarh to the west, Odisha to the south and West Bengal to the east. It has an area of 79,714 km² (30,778 sq mi). It is the 15th largest State by area, and the 14th largest by population. Hindi is the official language of the State.The city of Ranchi is its capital and Dumka its sub capital. The State is known for its waterfalls, hills and holy places: Baidyanath Dham, Parasnath and Rajrappa are major religious sites.
              </p>
            </div>

            {/* Chart */}
            <div className="md:col-span-2 bg-[#1c2836] rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <h2 className="text-lg font-semibold mb-4">
                Issues Raised vs Resolved
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="raised" fill="#3b82f6" />
                  <Bar dataKey="resolved" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { value: "220", label: "Monthly Active Users" },
              { value: "140", label: "Issues Raised" },
              { value: "115", label: "Issues Resolved" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#1c2836] rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition"
              >
                <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}