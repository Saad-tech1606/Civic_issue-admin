import { motion } from "framer-motion";
import { FaUsers, FaCog, FaCheckCircle, FaBell, FaChartLine } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <FaUsers className="text-4xl text-blue-400 drop-shadow-glow" />,
      color: "from-blue-500/40 to-indigo-600/40",
      glow: "shadow-[0_0_25px_rgba(59,130,246,0.7)]",
    },
    {
      title: "Active Issues",
      value: "89",
      icon: <MdReportProblem className="text-4xl text-red-400 drop-shadow-glow" />,
      color: "from-red-500/40 to-pink-600/40",
      glow: "shadow-[0_0_25px_rgba(239,68,68,0.7)]",
    },
    {
      title: "Resolved Issues",
      value: "432",
      icon: <FaCheckCircle className="text-4xl text-green-400 drop-shadow-glow" />,
      color: "from-green-500/40 to-emerald-600/40",
      glow: "shadow-[0_0_25px_rgba(34,197,94,0.7)]",
      onClick: () => navigate("/trackstatus"),
    },
    {
      title: "Settings",
      value: "Manage",
      icon: <FaCog className="text-4xl text-purple-400 drop-shadow-glow" />,
      color: "from-purple-500/40 to-pink-600/40",
      glow: "shadow-[0_0_25px_rgba(168,85,247,0.7)]",
      onClick: () => navigate("/settings"),
    },
    {
      title: "Notifications",
      value: "12",
      icon: <FaBell className="text-4xl text-yellow-400 drop-shadow-glow" />,
      color: "from-yellow-500/40 to-orange-500/40",
      glow: "shadow-[0_0_25px_rgba(250,204,21,0.7)]",
    },
    {
      title: "Analytics",
      value: "Insights",
      icon: <FaChartLine className="text-4xl text-pink-400 drop-shadow-glow" />,
      color: "from-pink-500/40 to-rose-600/40",
      glow: "shadow-[0_0_25px_rgba(244,114,182,0.7)]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-10 relative overflow-hidden">
      {/* Background floating lights */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-20 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Header */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        🌟 Civic Dashboard
      </motion.h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{
              scale: 1.08,
              rotateX: 6,
              rotateY: -6,
              boxShadow: "0px 20px 60px rgba(0,0,0,0.5)",
            }}
            onClick={card.onClick}
            className={`rounded-2xl ${card.glow} p-6 backdrop-blur-xl bg-gradient-to-br ${card.color} border border-white/10 cursor-pointer transform-gpu transition-all duration-300`}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              {card.icon}
              <h2 className="text-xl font-bold tracking-wide">{card.title}</h2>
              <p className="text-4xl font-extrabold">{card.value}</p>
              <button className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-semibold shadow-md transition-all duration-300">
                Open →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Landing Page Button */}
      <div className="flex justify-center mt-16">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 25px rgba(59,130,246,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
        >
          ⬅ Back to Landing Page
        </motion.button>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-gray-500 text-center mt-12 tracking-wide"
      >
        © {new Date().getFullYear()} Civic Dashboard • Designed with ⚡ Effects
      </motion.footer>
    </div>
  );
}
