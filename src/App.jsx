import { Routes, Route } from "react-router-dom";

// Admin page imports
import CivicAdminApp from "./Admin/CivicAdminApp";
import LandingAdmin from "./Admin/LandingAdmin";
import LoginPage from "./Admin/LoginPage";
import SignupPage from "./Admin/SignupPage";

function App() {
  return (
    <Routes>
      {/* Public landing for admin */}
      <Route path="/" element={<LandingAdmin />} />
      
      {/* Optional: standalone login/signup outside /admin if needed */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Hand off all /admin/* routing to CivicAdminApp */}
      <Route path="/admin/*" element={<CivicAdminApp />} />
    </Routes>
  );
}

export default App;
