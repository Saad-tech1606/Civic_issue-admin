import { useState } from "react";

export default function IssueDetails({ issue, onBack }) {
  const [status, setStatus] = useState(issue.status);
  const [comments, setComments] = useState([]);

  const statusColors = {
    Pending: "bg-yellow-500/80 text-black",
    "In Progress": "bg-blue-500/80 text-white",
    Resolved: "bg-green-500/80 text-white",
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl shadow-xl space-y-6 border border-gray-800">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
        📝 <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{issue.title}</span>
      </h2>

      {/* Details */}
      <div className="text-gray-300 space-y-1">
        <p><span className="font-semibold text-gray-400">📍 Location:</span> {issue.location}</p>
        <p>
          <span className="font-semibold text-gray-400">📊 Status:</span>{" "}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </p>
      </div>

      {/* Status Buttons */}
      <div className="flex gap-3 flex-wrap">
        {["Pending", "In Progress", "Resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all shadow-md
              ${status === s
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Comments Section */}
      <div>
        <textarea
          placeholder="💬 Add a comment and press Enter..."
          className="w-full p-4 bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              e.preventDefault();
              setComments([...comments, e.target.value]);
              e.target.value = "";
            }
          }}
        />

        <div className="mt-4">
          <h3 className="font-bold text-lg text-gray-200 mb-2">Comments:</h3>
          <ul className="space-y-3">
            {comments.map((c, i) => (
              <li
                key={i}
                className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-xl text-gray-200 shadow-md"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-4">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}
