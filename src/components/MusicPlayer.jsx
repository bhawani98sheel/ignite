import { useEffect, useRef, useState } from "react";
import bgMusic from "../assets/lofi.mp3"; // 🎵 add your music file

export default function MusicPlayer({ floating = false }) {
  const audioRef = useRef(new Audio(bgMusic));
  const [musicOn, setMusicOn] = useState(
    () => localStorage.getItem("ignite-music") === "on"
  );

  // Loop + persist state
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    if (musicOn) {
      audio.play().catch(() => {});
      localStorage.setItem("ignite-music", "on");
    } else {
      audio.pause();
      localStorage.setItem("ignite-music", "off");
    }
  }, [musicOn]);

  return (
    <div
      className={
        floating
          ? "absolute top-5 right-5 z-50"
          : "mt-4 flex justify-center"
      }
    >
      <button
        onClick={() => setMusicOn((p) => !p)}
        className="px-3 py-1 bg-black/50 text-yellow-300 rounded-lg shadow hover:bg-black/70 transition"
      >
        {musicOn ? "🔊 Music On" : "🔇 Music Off"}
      </button>
    </div>
  );
}
