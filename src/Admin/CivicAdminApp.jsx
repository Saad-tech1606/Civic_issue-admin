import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import IssuesPage from "./IssuesPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import LandingAdmin from "./LandingAdmin";

export default function CivicAdminApp() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => window.localStorage.getItem("adminAuthed") === "1"
  );

  const issues = useMemo(
    () => [
      { id: 1, title: "Pothole near Main Street", status: "Open", location: "Main Street, Ranchi" },
      { id: 2, title: "Streetlight not working", status: "In Progress", location: "Sector 4, Bokaro" },
      { id: 3, title: "Garbage collection issue", status: "Resolved", location: "Doranda, Ranchi" },
    ],
    []
  );

  useEffect(() => {
    if (isLoggedIn) {
      window.localStorage.setItem("adminAuthed", "1");
    } else {
      window.localStorage.removeItem("adminAuthed");
    }
  }, [isLoggedIn]);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;
    setIsLoggedIn(true);
    navigate("/admin/panel", { replace: true });
  };

  const handleSignup = ({ fullName, email, password, department }) => {
    if (!fullName || !email || !password || !department) return;
    navigate("/admin/login", { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/admin/login", { replace: true });
  };

  return (
    <Routes>
      {/* ✅ Landing Page route */}
      <Route path="landing" element={<LandingAdmin />} />

      {/* Public routes */}
      <Route
        path="login"
        element={
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => navigate("/admin/signup")}
          />
        }
      />
      <Route
        path="signup"
        element={
          <SignupPage
            onSignup={handleSignup}
            onSwitchToLogin={() => navigate("/admin/login")}
          />
        }
      />

      {/* Protected admin shell */}
      <Route
        path="panel"
        element={
          isLoggedIn ? (
            <AdminShell onLogout={handleLogout} issues={issues} />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      {/* /admin → show landing first */}
      <Route index element={<Navigate to="/admin/landing" replace />} />

      {/* unknown paths */}
      <Route path="*" element={<Navigate to="/admin/landing" replace />} />
    </Routes>
  );
}

function AdminShell({ onLogout, issues }) {
  const location = useLocation();
  const initialPage = location.state?.page || "dashboard";
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-y-auto p-6">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "issues" && <IssuesPage issues={issues} />}
        {currentPage === "analytics" && <AnalyticsPage />}
        {currentPage === "settings" && <SettingsPage onLogout={onLogout} />}
      </div>
    </div>
  );
}
