import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import IssuesPage from "./IssuesPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

/**
 * Mount this component at:  <Route path="/Admin/*" element={<CivicAdminApp />} />
 * It provides three route groups:
 *  - /Admin/LoginPage   (alias: /Admin/login)
 *  - /Admin/SignupPage  (alias: /Admin/signup)
 *  - /Admin/panel       (protected admin shell with Sidebar + pages)
 */
export default function CivicAdminApp() {
  const navigate = useNavigate();

  // persist a simple "logged-in" flag so refreshes keep you in
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => window.localStorage.getItem("adminAuthed") === "1"
  );

  // Example issues for IssuesPage
  const issues = useMemo(
    () => [
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
    ],
    []
  );

  // keep localStorage in sync
  useEffect(() => {
    if (isLoggedIn) {
      window.localStorage.setItem("adminAuthed", "1");
    } else {
      window.localStorage.removeItem("adminAuthed");
    }
  }, [isLoggedIn]);

  // --- handlers wired into LoginPage / SignupPage / SettingsPage
  const handleLogin = ({ email, password }) => {
    // TODO: replace with real API validation
    if (!email || !password) return;

    setIsLoggedIn(true);
    // go to the protected shell
    navigate("/Admin/panel", { replace: true });
  };

  const handleSignup = ({ fullName, email, password, department }) => {
    // TODO: call signup API
    if (!fullName || !email || !password || !department) return;

    // after successful signup, send back to login
    navigate("/Admin/LoginPage", { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/Admin/LoginPage", { replace: true });
  };

  return (
    <Routes>
      {/* Public routes (keep your existing links working) */}
      <Route
        path="LoginPage"
        element={
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => navigate("/Admin/SignupPage")}
          />
        }
      />
      <Route
        path="SignupPage"
        element={
          <SignupPage
            onSignup={handleSignup}
            onSwitchToLogin={() => navigate("/Admin/LoginPage")}
          />
        }
      />
      {/* Lowercase aliases */}
      <Route
        path="login"
        element={
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => navigate("/Admin/SignupPage")}
          />
        }
      />
      <Route
        path="signup"
        element={
          <SignupPage
            onSignup={handleSignup}
            onSwitchToLogin={() => navigate("/Admin/LoginPage")}
          />
        }
      />

      {/* Protected admin shell (Sidebar + main pages) */}
      <Route
        path="panel"
        element={
          isLoggedIn ? (
            <AdminShell onLogout={handleLogout} issues={issues} />
          ) : (
            <Navigate to="/Admin/LoginPage" replace />
          )
        }
      />

      {/* /Admin → send where appropriate */}
      <Route
        index
        element={
          <Navigate
            to={isLoggedIn ? "/Admin/panel" : "/Admin/LoginPage"}
            replace
          />
        }
      />

      {/* any unknown /Admin/* path */}
      <Route
        path="*"
        element={
          <Navigate
            to={isLoggedIn ? "/Admin/panel" : "/Admin/LoginPage"}
            replace
          />
        }
      />
    </Routes>
  );
}

/**
 * AdminShell: renders the sidebar and switches inner content with local state.
 * No extra Routers here; just plain state like your original implementation.
 */
function AdminShell({ onLogout, issues }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar drives which page is shown */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "issues" && <IssuesPage issues={issues} />}
        {currentPage === "analytics" && <AnalyticsPage />}
        {currentPage === "settings" && <SettingsPage onLogout={onLogout} />}
      </div>
    </div>
  );
}