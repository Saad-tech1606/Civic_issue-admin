import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import IssuesMap from "./IssuesMap"; // 👈 Import the map component

const DashboardPage = () => {
  const stats = [
    { title: "Total Issues", value: 120, color: "text-blue-400" },
    { title: "Pending", value: 45, color: "text-yellow-400" },
    { title: "Resolved", value: 60, color: "text-green-400" },
    { title: "Critical", value: 15, color: "text-red-400" },
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
    { id: 1, title: "Pothole Repair", status: "Pending", location: "Main Road", latitude: 23.3441, longitude: 85.3096 },
    { id: 2, title: "Water Leakage", status: "Resolved", location: "Sector 5", latitude: 23.3470, longitude: 85.3150 },
    { id: 3, title: "Power Outage", status: "Critical", location: "Block C", latitude: 23.3400, longitude: 85.3000 },
  ];

  const COLORS = ["#4F46E5", "#FACC15", "#10B981", "#EF4444"];

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 text-center"
          >
            <p className="text-lg font-semibold">{stat.title}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-4">
          <h2 className="text-xl mb-4 font-semibold">Monthly Issue Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={issueTrends}>
              <Tooltip />
              <Bar dataKey="issues" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-4">
          <h2 className="text-xl mb-4 font-semibold">Issue Categories</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={issueCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {issueCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2">Issue</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pothole Repair</td>
              <td className="text-yellow-400">Pending</td>
              <td>2025-09-05</td>
            </tr>
            <tr>
              <td>Water Leakage</td>
              <td className="text-green-400">Resolved</td>
              <td>2025-09-03</td>
            </tr>
            <tr>
              <td>Power Outage</td>
              <td className="text-red-400">Critical</td>
              <td>2025-09-02</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Issues Map */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Issues Map</h2>
        <IssuesMap issues={issues} />
      </div>
    </div>
  );
};

export default DashboardPage;
