// src/Admin/LandingAdmin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleRedirectToLogin = (e) => {
    e.preventDefault();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f1923] via-[#1a2235] to-[#111827] text-white">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-[#131d29]/95 backdrop-blur-md border-r border-gray-800 flex flex-col justify-between transition-all duration-300
          ${sidebarCollapsed ? "w-20" : "w-64"}
        `}
      >
        <div>
          <div className="flex items-center px-6 pt-6 pb-3">
            <span className="bg-purple-600 rounded-lg p-2 mr-3 shadow-lg">
              <FaUsersCog className="text-white w-6 h-6" />
            </span>
            {!sidebarCollapsed && (
              <span className="text-2xl font-extrabold tracking-wide text-white">
                Admin Panel / व्यवस्थापक पैनल
              </span>
            )}
          </div>

          {!sidebarCollapsed && (
            <div className="px-6 text-xs text-gray-400 mt-2 mb-2">
              PAGES / पेज
            </div>
          )}

          <nav>
            <ul className="space-y-1 px-2">
              {[
                { icon: <MdDashboard />, label: "Dashboard / डैशबोर्ड" },
                { icon: <MdAnalytics />, label: "Analytics / विश्लेषण" },
                { icon: <MdReportProblem />, label: "Manage Issues / समस्याओं का प्रबंधन" },
                { icon: <MdSettings />, label: "Settings / सेटिंग्स" },
                { icon: <MdLogin />, label: "Login / लॉगिन" },
                { icon: <MdAppRegistration />, label: "Signup / साइनअप" },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={handleRedirectToLogin}
                    className="flex items-center w-full p-3 rounded-xl text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
                  >
                    {item.icon}
                    {!sidebarCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </button>
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
          className={`fixed top-0 z-50 bg-[#131d29]/90 backdrop-blur-lg border-b border-gray-800 px-6 py-3 shadow-md flex items-center justify-between transition-all duration-300
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
          <div className="relative bg-gradient-to-r from-purple-700/50 via-fuchsia-600/40 to-indigo-700/50 p-12 rounded-3xl mb-12 shadow-2xl overflow-hidden">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
            >
              Atmanirbhar Bharat – Clean & Green Admin Panel 🚀
              <br />
              <span className="text-2xl text-gray-300">
                आत्मनिर्भर भारत – स्वच्छ और हरित व्यवस्थापक पैनल
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative text-lg text-gray-200 mt-6 max-w-3xl"
            >
              An administrative platform to oversee innovations under Clean &
              Green Technology.
              <br />
              स्वच्छ और हरित प्रौद्योगिकी के अंतर्गत नवाचारों की निगरानी के लिए
              एक प्रशासनिक प्लेटफ़ॉर्म।
            </motion.p>

            {/* Login & Signup */}
            <div className="relative mt-10 flex gap-6">
              <Link
                to="/admin/login"
                className="px-7 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
              >
                Login / लॉगिन
              </Link>
              <Link
                to="/admin/signup"
                className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
              >
                Signup / साइनअप
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                value: "350+",
                label: "Active Users / सक्रिय उपयोगकर्ता",
                icon: <MdPeople />,
              },
              {
                value: "220+",
                label: "Issues Reported / दर्ज समस्याएँ",
                icon: <MdReportProblem />,
              },
              {
                value: "92%",
                label: "Resolution Rate / समाधान दर",
                icon: <MdCheckCircle />,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.07 }}
                className="bg-[#1c2836]/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl text-center border border-gray-600/40 transition duration-300 hover:border-purple-400"
              >
                <div className="text-4xl text-purple-400 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
                <p className="text-gray-300 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-[#1c2836]/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/50 transition mb-12 border border-gray-600/40">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <MdTrendingUp /> Issues Trend / समस्या प्रवृत्ति
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#bbb" />
                <YAxis stroke="#bbb" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937" }} />
                <Line type="monotone" dataKey="issues" stroke="#ef4444" strokeWidth={3} />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="bg-[#1c2836]/60 backdrop-blur-xl rounded-2xl p-6 mb-12 shadow-2xl border border-gray-600/40"
          >
            <h2 className="text-lg font-semibold mb-4">Recent Activities / हाल की गतिविधियाँ</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>✔️ Issue #102 resolved by Admin / समस्या #102 व्यवस्थापक द्वारा हल की गई</li>
              <li>⚡ Analytics report generated for July / जुलाई के लिए विश्लेषण रिपोर्ट तैयार की गई</li>
              <li>🆕 New user signed up: John Doe / नया उपयोगकर्ता साइनअप हुआ: जॉन डो</li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { to: "/admin/login", label: "Dashboard / डैशबोर्ड", icon: <MdDashboard /> },
              { to: "/admin/login", label: "Analytics / विश्लेषण", icon: <MdAnalytics /> },
              { to: "/admin/login", label: "Manage Issues / समस्याओं का प्रबंधन", icon: <MdReportProblem /> },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="bg-[#1c2836]/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex flex-col items-center hover:shadow-purple-500/50 transition duration-300 group border border-gray-600/40"
              >
                <div className="text-5xl text-purple-400 group-hover:scale-110 transition duration-300">{link.icon}</div>
                <p className="mt-4 text-lg font-semibold text-white">{link.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
