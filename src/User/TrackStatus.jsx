import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import IssuesMap from "../shared/IssuesMap"; // ✅ adjust path if needed

export default function TrackStatus() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo issues (Jharkhand locations)
  const demoIssues = [
    {
      trackId: "CIV-1001",
      title: "Pothole near Ranchi Main Road",
      address: "Main Road, Ranchi, Jharkhand",
      location: "Ranchi Main Road",
      status: "Pending",
      createdAt: "2025-09-01T10:30:00Z",
      lat: 23.3441,
      lon: 85.3096,
      updates: [{ date: "2025-09-05T12:00:00Z", message: "Inspection team assigned" }],
    },
    {
      trackId: "CIV-1002",
      title: "Garbage Dump at Dhanbad Market",
      address: "Bank More, Dhanbad, Jharkhand",
      location: "Dhanbad Market",
      status: "In Progress",
      createdAt: "2025-09-02T09:00:00Z",
      lat: 23.7957,
      lon: 86.4304,
      updates: [{ date: "2025-09-06T14:30:00Z", message: "Cleaning underway" }],
    },
    {
      trackId: "CIV-1003",
      title: "Streetlight not working in Jamshedpur",
      address: "Bistupur, Jamshedpur, Jharkhand",
      location: "Jamshedpur Bistupur",
      status: "Resolved",
      createdAt: "2025-09-03T19:45:00Z",
      lat: 22.8046,
      lon: 86.2029,
      updates: [{ date: "2025-09-07T20:00:00Z", message: "Streetlight replaced" }],
    },
    {
      trackId: "CIV-1004",
      title: "Water supply issue in Hazaribagh",
      address: "Hazaribagh Town, Jharkhand",
      location: "Hazaribagh",
      status: "Rejected",
      createdAt: "2025-09-04T08:20:00Z",
      lat: 23.9966,
      lon: 85.3691,
      updates: [{ date: "2025-09-08T09:00:00Z", message: "Not under municipal jurisdiction" }],
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setIssues(demoIssues);
      setLoading(false);
    }, 1000);
  }, []);

  // Status color mapping
  const statusColors = {
    Pending: "bg-yellow-500/80 text-black",
    "In Progress": "bg-blue-500/80 text-white",
    Resolved: "bg-green-500/80 text-white",
    Rejected: "bg-red-500/80 text-white",
  };

  // Format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown date";
    return new Date(dateStr).toLocaleString();
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
        {/* LEFT: Issues List */}
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
                  {/* Track ID */}
                  <p className="text-sm text-gray-400 mb-1">
                    🆔 Track ID:{" "}
                    <span className="font-mono text-blue-400">{issue.trackId}</span>
                  </p>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {issue.title}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-gray-400 mb-1">📍 {issue.address}</p>

                  {/* Date */}
                  <p className="text-sm text-gray-400 mb-1">
                    🗓️ Reported On: {formatDate(issue.createdAt)}
                  </p>

                  {/* Status */}
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[issue.status] || "bg-gray-600 text-white"
                    }`}
                  >
                    {issue.status}
                  </span>

                  {/* Updates */}
                  {issue.updates && issue.updates.length > 0 && (
                    <div className="mt-3 text-sm text-gray-300">
                      <p className="font-semibold mb-1">🔔 Updates:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {issue.updates.map((u, idx) => (
                          <li key={idx}>
                            <span className="text-gray-400">
                              {formatDate(u.date)}:
                            </span>{" "}
                            {u.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
            <IssuesMap
              markers={issues.map((i) => ({
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

