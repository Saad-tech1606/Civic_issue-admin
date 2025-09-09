import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend } from "recharts";

export default function AnalyticsPage() {
  const statusData = [
    { name: "Resolved", value: 60 },
    { name: "Pending", value: 45 },
    { name: "Critical", value: 15 },
  ];
  const departmentData = [
    { dept: "Sanitation", issues: 40 },
    { dept: "Roads", issues: 35 },
    { dept: "Lighting", issues: 20 },
    { dept: "Water", issues: 25 },
  ];
  const trendData = [
    { month: "Jan", reported: 30 },
    { month: "Feb", reported: 45 },
    { month: "Mar", reported: 50 },
    { month: "Apr", reported: 35 },
    { month: "May", reported: 60 },
  ];
  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="p-8 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-20 bottom-20 right-20"></div>

      <h1 className="text-3xl font-bold text-white mb-6">📈 Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white">
          <h2 className="text-lg">Total Issues</h2>
          <p className="text-2xl font-bold">150</p>
        </div>
        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white">
          <h2 className="text-lg">Avg Resolution Time</h2>
          <p className="text-2xl font-bold">3.4 days</p>
        </div>
        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white">
          <h2 className="text-lg">This Month</h2>
          <p className="text-2xl font-bold">42 Issues</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-white mb-4">Issue Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-white mb-4">Issues by Department</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentData}>
              <XAxis dataKey="dept" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="issues" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-white mb-4">Issues Reported Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reported" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
