// src/components/Progress.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Progress() {
  const progressData = JSON.parse(
    localStorage.getItem("ignite-progress") ||
      '{"week":[0,0,0,0,0,0,0],"streak":0}'
  );

  const dailyProgress = JSON.parse(
    localStorage.getItem("ignite-daily-progress") || "[0,0,0,0,0,0,0]"
  );

  // 📊 Summary Stats
  const totalTasks = progressData.week.reduce((a, b) => a + b, 0);
  const avgHabits =
    dailyProgress.reduce((a, b) => a + b, 0) / dailyProgress.length;

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Title */}
      <h2 className="text-4xl font-extrabold gradient-text mb-10 flex items-center gap-2">
        📊 Progress Dashboard
      </h2>

      {/* 🔥 Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        {/* Tasks Completed */}
        <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-orange-500/20 shadow-lg hover:shadow-orange-500/40 transition">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            ✅ Total Tasks Completed
          </h3>
          <p className="text-5xl font-extrabold text-white">{totalTasks}</p>
          <p className="text-gray-400 text-sm mt-2">This week</p>
        </div>

        {/* Average Habit % (Radial progress) */}
        <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/40 transition flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">
            🔄 Avg Habit %
          </h3>
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#1e293b"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#06b6d4"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={
                  2 * Math.PI * 48 * (1 - (avgHabits || 0) / 100)
                }
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              {isNaN(avgHabits) ? 0 : avgHabits.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-xl border border-orange-500/20 shadow-lg hover:shadow-orange-500/40 transition relative overflow-hidden">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">
            ⚡ Current Streak
          </h3>
          <p className="text-5xl font-extrabold text-white animate-pulse">
            {progressData.streak}d
          </p>
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-3xl rounded-full"></div>
        </div>
      </div>

      {/* 📈 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Task Completion */}
        <div className="p-6 rounded-2xl bg-black/40 border border-yellow-500/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            📅 Weekly Task Completion
          </h3>
          <Line
            data={{
              labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              datasets: [
                {
                  label: "Tasks Completed",
                  data: progressData.week,
                  borderColor: "#facc15",
                  backgroundColor: "rgba(250,204,21,0.2)",
                  tension: 0.4,
                  fill: true,
                  pointRadius: 5,
                  pointHoverRadius: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { labels: { color: "white" } } },
              scales: {
                x: { ticks: { color: "#bbb" }, grid: { color: "#333" } },
                y: { ticks: { color: "#bbb" }, grid: { color: "#333" } },
              },
            }}
          />
        </div>

        {/* Habits Progress */}
        <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            🔄 Habits Progress (%)
          </h3>
          <Line
            data={{
              labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              datasets: [
                {
                  label: "Habits %",
                  data: dailyProgress,
                  borderColor: "#06b6d4",
                  backgroundColor: "rgba(6,182,212,0.25)",
                  tension: 0.4,
                  fill: true,
                  pointRadius: 5,
                  pointHoverRadius: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { labels: { color: "white" } } },
              scales: {
                x: { ticks: { color: "#bbb" }, grid: { color: "#333" } },
                y: { ticks: { color: "#bbb" }, grid: { color: "#333" } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
