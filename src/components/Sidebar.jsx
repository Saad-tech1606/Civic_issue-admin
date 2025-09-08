import { Home, List, BarChart2, Settings } from "lucide-react";

export default function Sidebar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "issues", label: "Issues", icon: <List size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        <span className="text-purple-400">⚙️ Civic</span>
        <span className="text-blue-400">Admin</span>
      </h1>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-800"
              }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
