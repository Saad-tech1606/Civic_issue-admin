import React, { useState } from "react";

export default function IssuesPage() {
  const [issues, setIssues] = useState([
    { id: 1, title: "Pothole near Main Road", status: "Pending", date: "2025-09-07", notes: "" },
    { id: 2, title: "Streetlight not working", status: "In Progress", date: "2025-09-05", notes: "" },
    { id: 3, title: "Garbage overflow", status: "Resolved", date: "2025-09-01", notes: "" },
    { id: 4, title: "Water leakage near park", status: "Pending", date: "2025-09-03", notes: "" },
    { id: 5, title: "Broken traffic signal", status: "In Progress", date: "2025-09-02", notes: "" },
  ]);

  const updateIssue = (id, field, value) => {
    setIssues(issues.map(issue => issue.id === id ? { ...issue, [field]: value } : issue));
  };

  return (
    <div className="p-8 w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      <div className="absolute w-72 h-72 bg-green-600 rounded-full blur-3xl opacity-20 top-16 left-16"></div>

      <h1 className="text-3xl font-bold text-white mb-6 relative z-10">📝 Manage Issues</h1>

      {/* Scrollable container */}
      <div className="relative z-10 space-y-6 overflow-y-auto max-h-[75vh] pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-xl">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl hover:scale-[1.01] transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl text-white font-semibold">{issue.title}</h2>
                <p className="text-gray-400 text-sm">Reported on {issue.date}</p>
              </div>

              {/* Status Dropdown */}
              <select
                value={issue.status}
                onChange={(e) => updateIssue(issue.id, "status", e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-900/70 border border-gray-600 text-white focus:border-blue-500"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Notes */}
            <textarea
              placeholder="Add notes or comments..."
              value={issue.notes}
              onChange={(e) => updateIssue(issue.id, "notes", e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/30 outline-none resize-none"
              rows={3}
            />

            {/* Save Button */}
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition">
              Save Changes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
