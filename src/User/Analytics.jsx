import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function Analytics() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("https://civilization-backend-production.up.railway.app/api/issues");
        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);

        // fallback mock data
        setIssues([
          { status: "Pending", category: "Pothole" },
          { status: "Resolved", category: "Garbage" },
          { status: "In Progress", category: "Water Supply" },
          { status: "Resolved", category: "Streetlight" },
          { status: "Pending", category: "Pothole" },
        ]);
      }
    };
    fetchIssues();
  }, []);

  // --- Analytics data ---
  const statusCounts = issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const COLORS = ["#FFBB28", "#00C49F", "#0088FE", "#FF4444"];

  const barData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  const lineData = issues.map((issue, i) => ({
    id: i + 1,
    status: issue.status,
    value: i + 1,
  }));

  const areaData = [
    { month: "Jan", issues: 10 },
    { month: "Feb", issues: 14 },
    { month: "Mar", issues: 7 },
    { month: "Apr", issues: 18 },
    { month: "May", issues: 23 },
  ];

  const categoryCounts = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {});

  const radarData = Object.entries(categoryCounts).map(([category, count]) => ({
    subject: category,
    count,
  }));

  // --- Quick KPIs ---
  const totalIssues = issues.length;
  const resolved = statusCounts["Resolved"] || 0;
  const pending = statusCounts["Pending"] || 0;
  const inProgress = statusCounts["In Progress"] || 0;
  const resolutionRate = totalIssues ? Math.round((resolved / totalIssues) * 100) : 0;

  // --- Card wrapper with glass + 3D hover ---
  const Card = ({ children }) => (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-6 transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-[0_8px_40px_rgb(99,102,241,0.6)]">
      {children}
    </div>
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-xl">
        🚀 User Analytics Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <h2 className="text-lg font-semibold text-gray-300">Total Issues</h2>
          <p className="text-4xl font-bold text-blue-400">{totalIssues}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-gray-300">Resolved</h2>
          <p className="text-4xl font-bold text-green-400">{resolved}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-gray-300">Pending</h2>
          <p className="text-4xl font-bold text-yellow-400">{pending}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-gray-300">In Progress</h2>
          <p className="text-4xl font-bold text-purple-400">{inProgress}</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* Pie Chart */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-center">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-center">Issues by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00C49F" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-center">Issue Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Area Chart */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-center">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="issues" stroke="#82ca9d" fillOpacity={1} fill="url(#colorIssues)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Radar Chart */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-center">Issues by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={100} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Issues" dataKey="count" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* NEW Gauge-like Donut Chart */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-center">Resolution Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Resolved", value: resolutionRate },
                  { name: "Remaining", value: 100 - resolutionRate },
                ]}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#10B981" />
                <Cell fill="#374151" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-3xl font-extrabold mt-2 text-green-400">
            {resolutionRate}%
          </p>
        </Card>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:scale-110 hover:shadow-pink-500/50 transition-all"
        >
          ⬅ Back to Home Page
        </button>
      </div>
    </div>
  );
}
