import { useState, useEffect } from "react";
import { Gift, Star, Coins } from "lucide-react";

export default function RedeemPoints() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch("https://civilization-backend-production.up.railway.app/api/user/points");
        const data = await res.json();
        setPoints(data.points || 250); // fallback
      } catch (err) {
        console.error("Error fetching points:", err);
        setPoints(250);
      }
    };
    fetchPoints();
  }, []);

  const rewards = [
    { id: 1, title: "Amazon Gift Card", cost: 200, icon: "🛒", gradient: "from-yellow-400 via-orange-500 to-red-500" },
    { id: 2, title: "Food Coupon", cost: 150, icon: "🍔", gradient: "from-green-400 via-emerald-500 to-teal-500" },
    { id: 3, title: "Movie Ticket", cost: 100, icon: "🎬", gradient: "from-purple-400 via-pink-500 to-rose-500" },
    { id: 4, title: "Electricity Discount", cost: 300, icon: "💡", gradient: "from-blue-400 via-indigo-500 to-violet-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-md">
          🎁 Redeem Your Points
        </h1>
        <p className="mt-3 text-gray-400">Exchange your points for exclusive rewards</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-16">
        <div className="flex items-center gap-3 bg-gray-800/60 backdrop-blur-xl px-8 py-5 rounded-2xl border border-gray-700 shadow-xl">
          <Coins size={32} className="text-yellow-400" />
          <div>
            <p className="text-gray-400 text-sm">Your Points</p>
            <h2 className="text-3xl font-bold text-yellow-300">{points}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-800/60 backdrop-blur-xl px-8 py-5 rounded-2xl border border-gray-700 shadow-xl">
          <Star size={32} className="text-blue-400" />
          <div>
            <p className="text-gray-400 text-sm">Rewards Available</p>
            <h2 className="text-3xl font-bold text-blue-300">{rewards.length}</h2>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {rewards.map((reward) => {
          const unlocked = points >= reward.cost;
          const progress = Math.min((points / reward.cost) * 100, 100);

          return (
            <div
              key={reward.id}
              className="relative group rounded-3xl p-6 bg-gray-900/70 backdrop-blur-xl border border-gray-700 shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 flex items-center justify-center text-4xl rounded-2xl bg-gradient-to-br ${reward.gradient} shadow-md`}
              >
                {reward.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold">{reward.title}</h3>
              <p className="text-gray-400 text-sm">Cost: {reward.cost} pts</p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{Math.floor(progress)}% Complete</p>

              {/* Redeem Button */}
              <button
                disabled={!unlocked}
                className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all shadow-lg ${
                  unlocked
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                {unlocked ? "Redeem Now 🎉" : `Need ${reward.cost - points} more`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Back to Dashboard */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:scale-105 transition-all"
        >
          ⬅ Back to homepage
        </button>
      </div>
    </div>
  );
}
