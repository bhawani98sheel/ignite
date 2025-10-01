// src/components/DailyTracker.jsx
import { useState, useEffect } from "react";
import {
  Coffee,
  Briefcase,
  Moon,
  BookOpen,
  Dumbbell,
  Brain,
  Music,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DailyTracker() {
  const defaultHabits = [
    { id: "med", label: "Meditation", icon: <Brain size={20} /> },
    { id: "workout", label: "Workout", icon: <Dumbbell size={20} /> },
    { id: "read", label: "Reading", icon: <BookOpen size={20} /> },
    { id: "music", label: "Music / Creative", icon: <Music size={20} /> },
    { id: "coffee", label: "Morning Coffee", icon: <Coffee size={20} /> },
    { id: "work", label: "Focused Work", icon: <Briefcase size={20} /> },
    { id: "evening", label: "Evening Reflection", icon: <Moon size={20} /> },
  ];

  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem("ignite-daily-state") || "{}")
  );

  // 🎨 Gradient palette
  const gradients = [
    ["#ff512f", "#dd2476"], // red → pink
    ["#2193b0", "#6dd5ed"], // blue → light blue
    ["#00b09b", "#96c93d"], // green → lime
    ["#8e2de2", "#4a00e0"], // purple
    ["#f7971e", "#ffd200"], // orange → yellow
  ];
  const gradientIndex = new Date().getDay() % gradients.length;
  const gradient = gradients[gradientIndex];

  // Save state
  useEffect(() => {
    localStorage.setItem("ignite-daily-state", JSON.stringify(state));
  }, [state]);

  // ✅ Toggle habit
  const toggle = (id) => {
    const next = { ...state, [id]: !state[id] };
    setState(next);

    const todays = JSON.parse(
      localStorage.getItem("ignite-daily-progress") || "[0,0,0,0,0,0,0]"
    );
    const completedCount = Object.values(next).filter(Boolean).length;
    const percent = Math.round((completedCount / defaultHabits.length) * 100);
    const todayIndex = new Date().getDay();
    todays[todayIndex] = percent;
    localStorage.setItem("ignite-daily-progress", JSON.stringify(todays));
  };

  // Progress calculation
  const completed = Object.values(state).filter(Boolean).length;
  const total = defaultHabits.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
        🔥 Daily Tracker
      </h2>

      {/* Main Progress Section */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="w-48 h-48 md:w-64 md:h-64">
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            styles={buildStyles({
              pathColor: `url(#gradient)`,
              textColor: "#fff",
              trailColor: "rgba(255,255,255,0.1)",
              textSize: "16px",
            })}
          />
          {/* Gradient definition */}
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor={gradient[0]} />
                <stop offset="100%" stopColor={gradient[1]} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className="mt-6 text-lg text-gray-300">
          {completed} / {total} habits completed today
        </p>
      </div>

      {/* Habit List */}
      <div className="grid gap-4 md:grid-cols-2">
        {defaultHabits.map((h) => (
          <label
            key={h.id}
            onClick={() => toggle(h.id)}
            className={`cursor-pointer flex justify-between items-center p-5 rounded-xl shadow-md transition ${
              state[h.id]
                ? "text-white"
                : "bg-black/30 hover:bg-black/50 border border-gray-700"
            }`}
            style={
              state[h.id]
                ? {
                    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                  }
                : {}
            }
          >
            <div className="flex items-center gap-3">
              {h.icon} <span className="font-medium">{h.label}</span>
            </div>
            <input
              type="checkbox"
              checked={!!state[h.id]}
              readOnly
              className="w-5 h-5 accent-orange-500"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
