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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 🔥 Fire Logo + Title */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="fire-logo">🔥</span>
        <h1 className="text-5xl md:text-6xl font-extrabold gradient-text glow mt-4 drop-shadow-lg">
          Ignite
        </h1>

        {/* Tagline + Quotes in a Box */}
<div
  className="mt-6 p-6 rounded-2xl relative text-center
             bg-black/40 backdrop-blur-md
             border-2 border-transparent bg-clip-padding
             gradient-border shadow-xl"
>
  {/* Tagline */}
  <p className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
    ✨ Spark Your Potential ✨
  </p>

          {/* Rotating Quotes */}
  <p className="mt-4 text-lg md:text-xl font-semibold text-orange-300 animate-fade">
    {quotes[index]}
  </p>
</div>

        {/* CTA Button */}

<button
  onClick={() => navigate("/login")}
  className="mt-10 px-10 py-4 rounded-full font-bold text-xl text-white
             bg-gradient-to-r from-pink-500 via-orange-500 to-red-600
             bg-[length:200%_200%] animate-gradient-move
             transition transform duration-300 ease-in-out
             hover:scale-110 shadow-2xl"
>
  Fuel My Fire 🔥
</button>


      </div>
    </div>
  );
}
