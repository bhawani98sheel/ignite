// src/components/MonthlyCalendar.jsx
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MonthlyCalendar() {
  const [date, setDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ignite-monthly") || "{}");
    setMonthlyData(stored);
  }, []);

  // Add badge for each day
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const count = monthlyData[key] || 0;
      return count > 0 ? (
        <div className="absolute bottom-1 right-1 text-xs bg-green-500 text-black px-1 rounded-full">
          {count}
        </div>
      ) : null;
    }
  };

  return (
    <div className="p-6 bg-black/40 rounded-2xl shadow-lg border border-purple-500/30">
      <h3 className="text-2xl font-bold text-purple-400 mb-6">📅 Monthly Progress</h3>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className="rounded-lg bg-black/50 text-white"
      />
    </div>
  );
}
