import React, { useState, useEffect } from "react";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch issues from API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("https://backend-civic.onrender.com/issue/issue_all");
        const data = await res.json();

        // add status + notes defaults if not in API
        const enriched = data.map((issue) => ({
          ...issue,
          status: issue.status || "Pending",
          notes: issue.notes || "",
        }));

        setIssues(enriched);
      } catch (err) {
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const updateIssue = (id, field, value) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id ? { ...issue, [field]: value } : issue
      )
    );
  };

  const saveIssue = async (issue) => {
    try {
      const res = await fetch(
        `https://backend-civic.onrender.com/issue/update/${issue._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(issue),
        }
      );

      if (!res.ok) throw new Error("Failed to update issue");
      alert("✅ Changes saved!");
    } catch (err) {
      console.error("Error saving issue:", err);
      alert("❌ Failed to save changes.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading issues...
      </div>
    );
  }

  return (
    <div className="p-8 w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      <div className="absolute w-72 h-72 bg-green-600 rounded-full blur-3xl opacity-20 top-16 left-16"></div>

      <h1 className="text-3xl font-bold text-white mb-6 relative z-10">
        📝 Manage Issues
      </h1>

      <div className="relative z-10 space-y-6 overflow-y-auto max-h-[75vh] pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-xl">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl hover:scale-[1.01] transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl text-white font-semibold">
                  {issue.title}
                </h2>
                <p className="text-gray-400 text-sm">Category: {issue.category}</p>
                {issue.location && (
                  <p className="text-gray-300 mt-1">
                    📍 <span className="italic">{issue.location}</span>
                  </p>
                )}
              </div>

              {/* Status Dropdown */}
              <select
                value={issue.status}
                onChange={(e) =>
                  updateIssue(issue._id, "status", e.target.value)
                }
                className="px-3 py-2 rounded-lg bg-gray-900/70 border border-gray-600 text-white focus:border-blue-500"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Description */}
            {issue.description && (
              <p className="text-gray-200 mb-3">{issue.description}</p>
            )}

            {/* Image */}
            {issue.image && (
              <img
                src={`https://backend-civic.onrender.com/${issue.image}`}
                alt="Issue"
                className="w-full max-h-64 object-cover rounded-lg mb-3 border border-gray-700"
              />
            )}

            {/* Notes */}
            <textarea
              placeholder="Add notes or comments..."
              value={issue.notes || ""}
              onChange={(e) =>
                updateIssue(issue._id, "notes", e.target.value)
              }
              className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/30 outline-none resize-none"
              rows={3}
            />

            {/* Save Button */}
            <button
              onClick={() => saveIssue(issue)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition"
            >
              Save Changes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
