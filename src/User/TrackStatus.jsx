import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import IssuesMap from "../shared/IssuesMap"; // ✅ adjust path if different

export default function TrackStatus() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch(
          "https://civilization-backend-production.up.railway.app/api/issues/"
        );
        const data = await res.json();

        // Make sure issues always has safe structure
        setIssues(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching issues:", err);
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Status color mapping
  const statusColors = {
    Pending: "bg-yellow-500/80 text-black",
    "In Progress": "bg-blue-500/80 text-white",
    Resolved: "bg-green-500/80 text-white",
    Rejected: "bg-red-500/80 text-white",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white p-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-10 text-center"
      >
        📌 Track Your Issues
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: Issue List */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-[#111827] rounded-2xl shadow-2xl border border-gray-800 p-6 overflow-y-auto max-h-[75vh]"
        >
          <h2 className="text-2xl font-bold mb-6">📝 Submitted Issues</h2>

          {loading ? (
            <p className="text-gray-400">⏳ Loading issues...</p>
          ) : issues.length === 0 ? (
            <p className="text-gray-400">⚠️ No issues found.</p>
          ) : (
            <ul className="space-y-4">
              {issues.map((issue, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.02, rotateX: 5, rotateY: -3 }}
                  className="p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 transition"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">
                    📍 {issue.address || issue.location || "Location not available"}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[issue.status] || "bg-gray-600 text-white"}`}
                  >
                    {issue.status || "Unknown"}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* RIGHT: Map */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-[#111827] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
        >
          <h2 className="text-2xl font-bold p-6">🗺️ Issues Map</h2>
          <div className="h-[70vh] w-full">
            {/* ✅ Pass filtered issues safely into IssuesMap */}
            <IssuesMap
              markers={issues
                .filter((i) => i.lat && i.lon)
                .map((i) => ({
                  lat: i.lat,
                  lon: i.lon,
                  title: i.title,
                  status: i.status,
                  address: i.address,
                }))}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
