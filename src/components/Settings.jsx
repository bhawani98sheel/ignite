

// src/components/Settings.jsx
import { useState, useEffect } from "react";

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("ignite-theme") || "dark");
  const [accent, setAccent] = useState(localStorage.getItem("ignite-accent") || "orange");
  const [soundOn, setSoundOn] = useState(localStorage.getItem("ignite-sound") !== "off");
  const [quotesEnabled, setQuotesEnabled] = useState(localStorage.getItem("ignite-quotes") !== "off");

  // ✅ Update CSS vars dynamically
  useEffect(() => {
    localStorage.setItem("ignite-theme", theme);
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    document.documentElement.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("ignite-accent", accent);
    const gradients = {
      orange: "linear-gradient(to right, #ff6a00, #ee0979)",
      blue: "linear-gradient(to right, #2193b0, #6dd5ed)",
      purple: "linear-gradient(to right, #8e2de2, #4a00e0)",
      green: "linear-gradient(to right, #11998e, #38ef7d)",
      pink: "linear-gradient(to right, #ff416c, #ff4b2b)",
    };
    document.documentElement.style.setProperty("--grad", gradients[accent]);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem("ignite-sound", soundOn ? "on" : "off");
  }, [soundOn]);

  useEffect(() => {
    localStorage.setItem("ignite-quotes", quotesEnabled ? "on" : "off");
  }, [quotesEnabled]);

  return (
    <div className="p-6 card">
      <h2 className="text-2xl font-bold gradient-text mb-4">⚙️ Settings</h2>

      {/* Theme Toggle */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🎨 Theme</h3>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 py-2 rounded bg-gradient-to-r from-orange-500 to-red-500 text-white"
        >
          Switch to {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      {/* Accent Gradients */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🌈 Accent Gradient</h3>
        <div className="flex gap-3 flex-wrap">
          {["orange", "blue", "purple", "green", "pink"].map((color) => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              className={`w-10 h-10 rounded-full border-2 ${
                accent === color ? "border-white scale-110" : "border-transparent"
              } transition`}
              style={{
                background:
                  color === "orange"
                    ? "linear-gradient(to right, #ff6a00, #ee0979)"
                    : color === "blue"
                    ? "linear-gradient(to right, #2193b0, #6dd5ed)"
                    : color === "purple"
                    ? "linear-gradient(to right, #8e2de2, #4a00e0)"
                    : color === "green"
                    ? "linear-gradient(to right, #11998e, #38ef7d)"
                    : "linear-gradient(to right, #ff416c, #ff4b2b)",
              }}
            ></button>
          ))}
        </div>
      </div>

      {/* Reward Sound */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔊 Reward Sound</h3>
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="px-4 py-2 rounded bg-gradient-to-r from-orange-500 to-red-500 text-white"
        >
          {soundOn ? "Turn Off" : "Turn On"}
        </button>
      </div>

      {/* Motivational Quotes */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">💡 Motivational Quotes</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={quotesEnabled}
            onChange={(e) => setQuotesEnabled(e.target.checked)}
          />
          Enable Quotes
        </label>
      </div>
    </div>
  );
}
