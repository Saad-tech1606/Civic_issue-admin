import { Routes, Route } from "react-router-dom";
import LandingPage from "./shared/LandingPage";
import IssuesMap from "./shared/IssuesMap";

// User imports
import CivicUserApp from "./User/CivicUserApp";
import UserDashboard from "./User/UserDashboard";
import UserProfile from "./User/UserProfile";
import ReportIssue from "./User/ReportIssue";
import Analytics from "./User/Analytics";
import TrackStatus from "./User/TrackStatus";
import RedeemPoints from "./User/RedeemPoints";
import Settings from "./User/Settings";
import ContactUs from "./User/ContactUs";
import UserLogin from "./User/UserLogin";
import UserSignup from "./User/UserSignup";
import Messages from "./User/Messages";
import Notifications from "./User/Notifications";

// Admin imports
import CivicAdminApp from "./Admin/CivicAdminApp";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<IssuesMap />} />

      {/* User login/signup */}
      <Route path="/User/login" element={<UserLogin />} />
      <Route path="/User/signup" element={<UserSignup />} />

      {/* Civic User App */}
      <Route path="/User" element={<CivicUserApp />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="report" element={<ReportIssue />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="track" element={<TrackStatus />} />
        <Route path="redeem" element={<RedeemPoints />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>

      {/* Messages & Notifications */}
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />

      {/* Civic Admin App (handles login, signup, and dashboard) */}
      <Route path="/admin/*" element={<CivicAdminApp />} />
    </Routes>
  );
}

export default App;
