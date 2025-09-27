import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdAnalytics,
  MdReportProblem,
  MdSettings,
  MdLogin,
  MdAppRegistration,
  MdTrendingUp,
  MdCheckCircle,
  MdPeople,
} from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ReactCountryFlag from "react-country-flag";

// Sample chart data
const chartData = [
  { month: "Jan", issues: 50, resolved: 35 },
  { month: "Feb", issues: 60, resolved: 50 },
  { month: "Mar", issues: 45, resolved: 38 },
  { month: "Apr", issues: 80, resolved: 65 },
  { month: "May", issues: 70, resolved: 60 },
  { month: "Jun", issues: 90, resolved: 75 },
];

export default function LandingAdmin() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f1923] text-white">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-[#131d29] border-r border-gray-800 flex flex-col justify-between transition-all duration-300
          ${sidebarCollapsed ? "w-20" : "w-64"}
        `}
      >
        <div>
          <div className="flex items-center px-6 pt-6 pb-3">
            <span className="bg-purple-600 rounded-lg p-2 mr-3 shadow-md">
              <FaUsersCog className="text-white w-6 h-6" />
            </span>
            {!sidebarCollapsed && (
              <span className="text-2xl font-extrabold tracking-wide text-white">
                Admin Panel
              </span>
            )}
          </div>

          <div
            className={`px-6 text-xs text-gray-400 mt-2 mb-2 ${
              sidebarCollapsed ? "hidden" : ""
            }`}
          >
            PAGES
          </div>

          <nav>
            <ul className="space-y-1 px-2">
              {[
                {
                  to: "/admin/panel",
                  state: { page: "dashboard" },
                  icon: <MdDashboard />,
                  label: "Dashboard",
                },
                {
                  to: "/admin/panel",
                  state: { page: "analytics" },
                  icon: <MdAnalytics />,
                  label: "Analytics",
                },
                {
                  to: "/admin/panel",
                  state: { page: "issues" },
                  icon: <MdReportProblem />,
                  label: "Manage Issues",
                },
                {
                  to: "/admin/panel",
                  state: { page: "settings" },
                  icon: <MdSettings />,
                  label: "Settings",
                },
                { to: "/admin/login", icon: <MdLogin />, label: "Login" },
                {
                  to: "/admin/signup",
                  icon: <MdAppRegistration />,
                  label: "Signup",
                },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    state={item.state}
                    className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-[#1d2a36] hover:text-white transition-all"
                  >
                    {item.icon}
                    {!sidebarCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav
          className={`fixed top-0 z-50 bg-[#131d29] border-b border-gray-800 px-6 py-3 shadow-md flex items-center justify-between transition-all duration-300
            ${sidebarCollapsed ? "left-20 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-16rem)]"}
          `}
        >
          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="mr-4 p-2 rounded hover:bg-[#223049] focus:outline-none transition flex items-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect y="5" width="24" height="2" rx="1" fill="#fff" />
              <rect y="11" width="24" height="2" rx="1" fill="#fff" />
              <rect y="17" width="24" height="2" rx="1" fill="#fff" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-gray-200">
              <ReactCountryFlag
                countryCode="IN"
                svg
                style={{ width: "1.8em", height: "1.8em" }}
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-purple-500"></div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 mt-20 px-8 py-6 overflow-y-auto">
          {/* HERO SECTION */}
          <div className="relative bg-gradient-to-r from-purple-700/30 via-fuchsia-600/20 to-indigo-700/30 p-10 rounded-2xl mb-12 overflow-hidden">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.3 }}
              transition={{ duration: 2 }}
              className="absolute top-0 left-0 w-60 h-60 bg-purple-600 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.3 }}
              transition={{ duration: 2 }}
              className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-600 rounded-full blur-3xl"
            />

            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative text-5xl font-extrabold text-white drop-shadow-lg"
            >
              Civic Command Center 🚀
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative text-lg text-gray-200 mt-4 max-w-2xl"
            >
              Oversee, Analyze, and Drive impactful decisions. Your command
              center for community management.
            </motion.p>

            {/* Login & Signup */}
            <div className="relative mt-8 flex gap-4">
              <Link
                to="/admin/login"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
              >
                Login
              </Link>
              <Link
                to="/admin/signup"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition"
              >
                Signup
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { value: "350+", label: "Active Users", icon: <MdPeople /> },
              { value: "220+", label: "Issues Reported", icon: <MdReportProblem /> },
              { value: "92%", label: "Resolution Rate", icon: <MdCheckCircle /> },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c2836] rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition"
              >
                <div className="text-3xl text-purple-400 flex justify-center mb-2">
                  {stat.icon}
                </div>
                <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-[#1c2836] rounded-xl p-6 shadow-lg hover:shadow-xl transition mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MdTrendingUp /> Issues Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey="issues" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="bg-[#1c2836] rounded-xl p-6 mb-10 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>✔️ Issue #102 resolved by Admin</li>
              <li>⚡ Analytics report generated for July</li>
              <li>🆕 New user signed up: John Doe</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { to: "/admin/panel", label: "Dashboard", icon: <MdDashboard /> },
              { to: "/admin/panel", label: "Analytics", icon: <MdAnalytics /> },
              { to: "/admin/panel", label: "Manage Issues", icon: <MdReportProblem /> },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="bg-[#1c2836] rounded-xl p-6 shadow-lg flex flex-col items-center hover:shadow-xl transition group"
              >
                <div className="text-4xl text-purple-400 group-hover:scale-110 transition">
                  {link.icon}
                </div>
                <p className="mt-4 text-lg font-semibold">{link.label}</p>
              </Link>
            ))}
          </div>

          {/* Team Section */}
          <div className="bg-[#1c2836] rounded-xl p-6 mt-10 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <div className="flex gap-6">
              {["Alice", "Bob", "Charlie"].map((member, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-purple-500 mb-2"></div>
                  <span className="text-sm text-gray-300">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
