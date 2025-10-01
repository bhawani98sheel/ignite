// src/components/Progress.jsx
import { useState, useEffect } from "react";
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
import MonthlyCalendar from "./MonthlyCalendar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Progress() {
  const [progressData, setProgressData] = useState(
    () =>
      JSON.parse(localStorage.getItem("ignite-progress")) || {
        week: [0, 0, 0, 0, 0, 0, 0],
        streak: 0,
      }
  );

  // 🎨 Accent
  const accent = localStorage.getItem("ignite-accent") || "orange";
  const accentColors = {
    orange: "#ff5722",
    blue: "#2196f3",
    purple: "#9c27b0",
    green: "#4caf50",
  };

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Tasks Completed",
        data: progressData.week,
        fill: false,
        borderColor: accentColors[accent],
        backgroundColor: accentColors[accent],
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-8 bg-black/40 rounded-2xl shadow-lg border border-orange-600/40 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 gradient-text">📊 Progress</h2>
      <p className="mb-4 text-lg text-gray-300">
        Current streak: <span className="font-semibold text-white">{progressData.streak}</span> days
      </p>

      {/* Weekly Line Chart */}
      <div className="bg-black/30 p-6 rounded-xl mb-8">
        <Line data={chartData} />
      </div>

      {/* Monthly Calendar */}
      <MonthlyCalendar />
    </div>
  );
}
