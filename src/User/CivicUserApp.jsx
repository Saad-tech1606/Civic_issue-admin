 
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MdDashboard, MdPerson, MdReportProblem, MdTrendingUp,
  MdTrackChanges, MdRedeem, MdSettings, MdContactMail,
  MdExpandMore, MdExpandLess
} from "react-icons/md";
import { FaRegCommentDots, FaRegBell } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

export default function CivicUserApp() {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear auth tokens here if using JWT
    navigate("/user/Userlogin");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-[#1a2537] flex flex-col justify-between">
        <div>
          <div className="flex items-center px-6 pt-6 pb-3">
            <span className="text-2xl font-bold text-white">Civic User</span>
          </div>
          <nav>
            <ul className="space-y-1 px-2">
              <li>
                <Link to="/user/dashboard" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdDashboard className="w-5 h-5 mr-3" />Dashboard
                </Link>
              </li>
              <li>
                <Link to="/user/profile" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdPerson className="w-5 h-5 mr-3" />Profile Overview
                </Link>
              </li>
              <li>
                <Link to="/user/report" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdReportProblem className="w-5 h-5 mr-3" />Report Issue
                </Link>
              </li>

              {/* Analytics Dropdown */}
              <li>
                <button
                  onClick={() => setAnalyticsOpen((v) => !v)}
                  className="w-full flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C] focus:outline-none"
                >
                  <MdTrendingUp className="w-5 h-5 mr-3" /> Analytics
                  <span className="ml-auto">
                    {analyticsOpen ? <MdExpandLess /> : <MdExpandMore />}
                  </span>
                </button>
                {analyticsOpen && (
                  <ul className="ml-8 mt-1 mb-1 space-y-1">
                    <li>
                      <Link to="/user/analytics" className="flex items-center p-2 text-gray-300 hover:bg-[#24304C] rounded">
                        Local
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link to="/user/track" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdTrackChanges className="w-5 h-5 mr-3" />Track Status
                </Link>
              </li>
              <li>
                <Link to="/user/redeem" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdRedeem className="w-5 h-5 mr-3" />Redeem Points
                </Link>
              </li>
              <li>
                <Link to="/user/settings" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdSettings className="w-5 h-5 mr-3" />Settings
                </Link>
              </li>
              <li>
                <Link to="/user/contact" className="flex items-center p-3 rounded text-gray-200 hover:bg-[#24304C]">
                  <MdContactMail className="w-5 h-5 mr-3" />Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#24304C] flex items-center justify-center">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-[#1a2537] px-4 py-2 shadow flex items-center justify-between">
          <div className="flex items-center w-1/3">
            <div className="relative w-full">
              <span className="absolute left-3 top-2 text-gray-400">🔍</span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded bg-[#202d43] text-gray-300 placeholder-gray-400 focus:outline-none"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/user/messages" className="relative">
              <FaRegCommentDots size={22} className="text-gray-200" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-1.5">3</span>
            </Link>

            <Link to="/user/notifications" className="relative">
              <FaRegBell size={22} className="text-gray-200" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-1.5">7</span>
            </Link>

            <ReactCountryFlag countryCode="IN" svg style={{ width: "1.5em", height: "1.5em" }} />
            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-green-500"></div>
          </div>
        </nav>

        {/* Nested Route Outlet */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
