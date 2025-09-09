import { Home, List, BarChart2, Settings } from "lucide-react";

export default function Sidebar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "issues", label: "Issues", icon: <List size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-950/95 to-black/95 backdrop-blur-xl border-r border-gray-800 shadow-lg flex flex-col">
      {/* Logo / Title */}
      <h1 className="text-2xl font-extrabold mb-10 mt-6 text-center tracking-wide">
        <span className="text-purple-400 drop-shadow-md">⚙️ Civic</span>
        <span className="text-blue-400">Admin</span>
      </h1>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
              ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-l-4 border-purple-400"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
          >
            <span
              className={`transition-transform duration-200 ${
                currentPage === item.id ? "scale-110" : "group-hover:translate-x-1"
              }`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2025 Civic Admin
      </div>
    </aside>
  );
}
