
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import IssuesPage from "./IssuesPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import LoginPage from "./LoginPage";   // 👈 login page
import SignupPage from "./SignupPage"; // 👈 signup page

export default function CivicAdminApp() {
  const [currentPage, setCurrentPage] = useState("login"); // start with login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example issues for the map
  const [issues] = useState([
    {
      id: 1,
      title: "Pothole near Main Street",
      status: "Open",
      location: "Main Street, Ranchi",
      latitude: 23.3441,
      longitude: 85.3096,
    },
    {
      id: 2,
      title: "Streetlight not working",
      status: "In Progress",
      location: "Sector 4, Bokaro",
      latitude: 23.6693,
      longitude: 86.1511,
    },
    {
      id: 3,
      title: "Garbage collection issue",
      status: "Resolved",
      location: "Doranda, Ranchi",
      latitude: 23.3186,
      longitude: 85.3099,
    },
  ]);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  // Handle signup (redirect to login after signup)
  const handleSignup = () => {
    setCurrentPage("login");
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  if (!isLoggedIn) {
    return currentPage === "login" ? (
      <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage("signup")} />
    ) : (
      <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setCurrentPage("login")} />
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "issues" && <IssuesPage issues={issues} />} {/* 👈 pass issues here */}
        {currentPage === "analytics" && <AnalyticsPage />}
        {currentPage === "settings" && <SettingsPage onLogout={handleLogout} />}
      </div>
    </div>
  );
}
