import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const quotes = [
  "Consistency is the key to success 🔑",
  "Dream big, work hard, stay focused 💪",
  "Push yourself, because no one else will 🚀",
  "Don’t stop until you’re proud ✨",
  "Small steps every day lead to big results 🌱",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 🔥 Fire Logo + Title + Tagline */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Fire Logo */}
        <span className="fire-logo">🔥</span>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold gradient-text glow mt-4">
          Ignite
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-200 italic mt-2">
          Spark your Potential ✨
        </p>

        {/* Rotating Quotes */}
        <p className="mt-6 text-xl text-gray-300 animate-fade h-6">
          {quotes[index]}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-8 px-8 py-3 rounded-full font-bold text-lg text-white
                     bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
                     hover:scale-105 transition transform shadow-lg"
        >
          Get Started 🚀
        </button>
      </div>
    </div>
  );
}
