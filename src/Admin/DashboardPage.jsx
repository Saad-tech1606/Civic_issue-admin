import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import IssuesMap from "../shared/IssuesMap";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Issues",
      value: 120,
      color: "from-blue-500 to-indigo-600",
      icon: <Activity className="w-6 h-6 text-white" />,
    },
    {
      title: "Pending",
      value: 45,
      color: "from-yellow-400 to-orange-500",
      icon: <Loader2 className="w-6 h-6 text-white" />,
    },
    {
      title: "Resolved",
      value: 60,
      color: "from-green-400 to-emerald-600",
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
    },
    {
      title: "Critical",
      value: 15,
      color: "from-red-500 to-pink-600",
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
    },
  ];

  const issueTrends = [
    { month: "Jan", issues: 20 },
    { month: "Feb", issues: 35 },
    { month: "Mar", issues: 25 },
    { month: "Apr", issues: 40 },
  ];

  const issueCategories = [
    { name: "Roads", value: 40 },
    { name: "Water", value: 30 },
    { name: "Electricity", value: 20 },
    { name: "Other", value: 10 },
  ];

  const issues = [
    {
      id: 1,
      title: "Pothole Repair",
      status: "Pending",
      location: "Main Road",
      date: "2025-09-05",
      latitude: 23.3441,
      longitude: 85.3096,
    },
    {
      id: 2,
      title: "Water Leakage",
      status: "Resolved",
      location: "Sector 5",
      date: "2025-09-03",
      latitude: 23.347,
      longitude: 85.315,
    },
    {
      id: 3,
      title: "Power Outage",
      status: "Critical",
      location: "Block C",
      date: "2025-09-02",
      latitude: 23.34,
      longitude: 85.3,
    },
  ];

  const COLORS = ["#6366F1", "#FBBF24", "#10B981", "#EF4444"];

  return (
    <div className="p-8 space-y-10 text-white min-h-screen bg-gradient-to-br from-slate-950 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Dashboard Overview ✨
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Realtime summary of reported civic issues
            </p>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition duration-300 bg-gradient-to-br ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/90">{stat.title}</p>
                  <p className="text-3xl font-extrabold mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-5 shadow-lg hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold mb-3">
                📈 Monthly Issue Trends
              </h2>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={issueTrends}>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937", // slate-800
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB", // light text
                      }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#E5E7EB" }}
                    />
                    <Bar dataKey="issues" fill="#6366F1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-5 shadow-lg hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold mb-3">🥧 Issue Categories</h2>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={issueCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {issueCategories.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937", // brighter than before
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#E5E7EB" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity + Map column */}
          <aside className="space-y-6">
            <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-5 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg font-semibold mb-3">📝 Recent Activity</h3>
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-gray-200">
                  <thead>
                    <tr className="text-xs text-gray-400 uppercase">
                      <th className="pb-2">Issue</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((it) => (
                      <tr
                        key={it.id}
                        className="hover:bg-gray-800/40 transition"
                      >
                        <td className="py-2">{it.title}</td>
                        <td
                          className={`py-2 font-medium ${
                            it.status === "Pending"
                              ? "text-yellow-400"
                              : it.status === "Resolved"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {it.status}
                        </td>
                        <td className="py-2">{it.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-5 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg font-semibold mb-3">🗺 Quick Map</h3>
              <div style={{ height: 380 }}> {/* increased height */}
                <IssuesMap issues={issues} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
