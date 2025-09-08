import { useState } from "react";

export default function IssueDetails({ issue, onBack }) {
  const [status, setStatus] = useState(issue.status);
  const [comments, setComments] = useState([]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">📝 {issue.title}</h2>
      <p className="mb-2">Location: {issue.location}</p>
      <p className="mb-4">Status: {status}</p>

      <div className="space-x-2 mb-6">
        {["Pending", "In Progress", "Resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded-xl ${
              status === s ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Add a comment..."
        className="w-full p-3 bg-gray-800 rounded-xl mb-4"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            setComments([...comments, e.target.value]);
            e.target.value = "";
          }
        }}
      />

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Comments:</h3>
        <ul className="space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="bg-gray-800 p-2 rounded-xl">{c}</li>
          ))}
        </ul>
      </div>

      <button onClick={onBack} className="bg-indigo-600 px-4 py-2 rounded-xl">
        ⬅ Back
      </button>
    </div>
  );
}
