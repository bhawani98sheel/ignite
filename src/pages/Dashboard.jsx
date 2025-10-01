// src/pages/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import confettiAnimation from "../assets/confetti.json";
import rewardSound from "../assets/reward.mp3";
import Progress from "../components/Progress";
import StudyTracker from "../components/StudyTracker";
import Upload from "../components/Uploads";
import DailyTracker from "../components/DailyTracker";
import Settings from "../components/Settings";

/* ---------------- Quiz ---------------- */
function Quiz() {
  const defaultQuestions = [
    { question: "What does React primarily help with?", options: ["Database", "UI Building", "Server hosting", "File storage"], answer: "UI Building" },
    { question: "Which hook manages state?", options: ["useState", "useEffect", "useRouter", "useClass"], answer: "useState" },
    { question: "Who developed React?", options: ["Google", "Microsoft", "Meta", "Amazon"], answer: "Meta" },
  ];

  const [customQuestions, setCustomQuestions] = useState(
    () => JSON.parse(localStorage.getItem("ignite-custom-quiz") || "[]")
  );
  const [questions, setQuestions] = useState([...defaultQuestions, ...customQuestions]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setQuestions([...defaultQuestions, ...customQuestions]);
  }, [customQuestions]);

  const handleAnswer = (opt) => {
    setSelected(opt);
    if (opt === questions[current].answer) setScore((p) => p + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setCompleted(true);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setCompleted(false);
    setSelected(null);
  };

  return (
    <div className="p-6 bg-black/40 rounded-lg shadow-lg border border-orange-600/40">
      {completed ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎉 Quiz Completed!</h3>
          <p className="text-gray-200">Score: {score} / {questions.length}</p>
          <button onClick={resetQuiz} className="mt-4 px-4 py-2 bg-orange-600 rounded">Retry</button>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold text-yellow-400 mb-4">
            Q{current + 1}. {questions[current].question}
          </h3>
          <div className="flex flex-col gap-3">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className={`px-4 py-2 rounded transition ${
                  selected
                    ? opt === questions[current].answer
                      ? "bg-green-600"
                      : opt === selected
                      ? "bg-red-600"
                      : "bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-600"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- Dashboard ---------------- */
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // 🔊 Sound
  const audioRef = useRef(new Audio(rewardSound));
  const [showReward, setShowReward] = useState(false);

  // ✅ Settings states
  const [theme, setTheme] = useState(localStorage.getItem("ignite-theme") || "dark");
  const [accent, setAccent] = useState(localStorage.getItem("ignite-accent") || "orange");
  const [soundOn, setSoundOn] = useState(localStorage.getItem("ignite-sound") !== "off");

  useEffect(() => {
    const handleStorage = () => {
      setTheme(localStorage.getItem("ignite-theme") || "dark");
      setAccent(localStorage.getItem("ignite-accent") || "orange");
      setSoundOn(localStorage.getItem("ignite-sound") !== "off");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Accent color mapping
  const accentMap = {
    orange: {
      nav: "from-orange-600 to-red-800",
      active: "bg-orange-600",
      hover: "hover:bg-orange-700",
    },
    blue: {
      nav: "from-blue-600 to-blue-900",
      active: "bg-blue-600",
      hover: "hover:bg-blue-700",
    },
    purple: {
      nav: "from-purple-600 to-purple-900",
      active: "bg-purple-600",
      hover: "hover:bg-purple-700",
    },
    green: {
      nav: "from-green-600 to-green-900",
      active: "bg-green-600",
      hover: "hover:bg-green-700",
    },
  };

  // ✅ Study Tracker
  const [studyItems, setStudyItems] = useState(
    () => JSON.parse(localStorage.getItem("ignite-study-items") || "[]")
  );
  useEffect(() => {
    localStorage.setItem("ignite-study-items", JSON.stringify(studyItems));
  }, [studyItems]);

  // ✅ Uploads
  const [uploads, setUploads] = useState(
    () => JSON.parse(localStorage.getItem("ignite-uploads") || "[]")
  );

  // ✅ Progress
  const [progressData, setProgressData] = useState(
    () => JSON.parse(localStorage.getItem("ignite-progress") || '{"week":[0,0,0,0,0,0,0],"streak":0}')
  );

  useEffect(() => {
    const today = new Date().getDay();
    const completedCount = studyItems.filter((t) => t.category === "Tasks" && t.completed).length;
    const week = [...progressData.week];
    week[today] = completedCount;
    const streak = completedCount > 0 ? progressData.streak + 1 : 0;
    const updated = { week, streak };
    setProgressData(updated);
    localStorage.setItem("ignite-progress", JSON.stringify(updated));
  }, [studyItems]);

  // ✅ Quotes
  const quotes = [
    "Discipline is the bridge between goals and accomplishment.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setQuoteIndex((p) => (p + 1) % quotes.length), 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("ignite-current-user");
    navigate("/login");
  };

  return (
    <div className={`${theme === "dark" ? "bg-dark text-white" : "bg-white text-black"} min-h-screen`}>
      {/* 🔝 Top Nav */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center shadow-lg transition bg-gradient-to-r ${accentMap[accent].nav}`}
      >
        {/* Logo + Tagline */}
        <div onClick={() => navigate("/Home")} className="cursor-pointer flex flex-col">
          <h1 className="text-2xl font-bold leading-tight">🔥 Ignite</h1>
          <span className="text-xs italic">Fuel your learning journey</span>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 flex-wrap relative">
          {[
            ["overview", "🏠 Overview"],
            ["study", "📘 Study Tracker"],
            ["uploads", "📂 Uploads"],
            ["quiz", "🧠 Quiz"],
            ["progress", "📊 Progress"],
            ["daily", "🔥 Daily Tracker"],
            ["settings", "⚙️ Settings"],
          ].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-3 py-2 text-sm font-semibold transition ${
                activeTab === tab ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-slideIn"></span>
              )}
            </button>
          ))}

          <button
            onClick={logout}
            className="px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* 🔄 Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-lg shadow-lg relative">
            <Lottie animationData={confettiAnimation} loop={false} />
            <h3 className="text-2xl font-bold mb-4">🎉 Congrats!</h3>
            <p>You completed all tasks 🚀🔥</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <main className="p-6 pt-28 animate-fade">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 gradient-text">📊 Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Overview Cards */}
              <div className="p-4 bg-black/40 rounded shadow">
                <h3 className="text-lg font-bold mb-2">📘 Study Tracker</h3>
                <p>
                  {studyItems.filter((t) => t.category === "Tasks" && t.completed).length} /
                  {studyItems.filter((t) => t.category === "Tasks").length} tasks completed
                </p>
                <button
                  onClick={() => setActiveTab("study")}
                  className={`mt-3 px-3 py-1 rounded ${theme === "dark" ? accentMap[accent].active : "bg-gray-300"}`}
                >
                  Go to Section →
                </button>
              </div>

              <div className="p-4 bg-black/40 rounded shadow">
                <h3 className="text-lg font-bold mb-2">📂 Uploads</h3>
                <p>{uploads.length} files uploaded</p>
                <button
                  onClick={() => setActiveTab("uploads")}
                  className={`mt-3 px-3 py-1 rounded ${theme === "dark" ? accentMap[accent].active : "bg-gray-300"}`}
                >
                  Go to Section →
                </button>
              </div>

              <div className="p-4 bg-black/40 rounded shadow">
                <h3 className="text-lg font-bold mb-2">🧠 Quiz</h3>
                <p>Challenge yourself with quizzes!</p>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className={`mt-3 px-3 py-1 rounded ${theme === "dark" ? accentMap[accent].active : "bg-gray-300"}`}
                >
                  Go to Section →
                </button>
              </div>

              <div className="p-4 bg-black/40 rounded shadow">
                <h3 className="text-lg font-bold mb-2">📊 Progress</h3>
                <p>Current streak: {progressData.streak} days</p>
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`mt-3 px-3 py-1 rounded ${theme === "dark" ? accentMap[accent].active : "bg-gray-300"}`}
                >
                  Go to Section →
                </button>
              </div>

              <div className="p-4 bg-black/40 rounded shadow">
                <h3 className="text-lg font-bold mb-2">🔥 Daily Tracker</h3>
                <p>
                  Today’s habits:{" "}
                  {JSON.parse(localStorage.getItem("ignite-daily-progress") || "[0,0,0,0,0,0,0]")[new Date().getDay()]}%
                </p>
                <button
                  onClick={() => setActiveTab("daily")}
                  className={`mt-3 px-3 py-1 rounded ${theme === "dark" ? accentMap[accent].active : "bg-gray-300"}`}
                >
                  Go to Section →
                </button>
              </div>

              <div className="p-4 bg-black/40 rounded shadow">
                <h3 className="text-lg font-bold mb-2">⚙️ Settings</h3>
                <p className="text-sm text-gray-300">
                  Theme: {theme} <br />
                  Sound: {soundOn ? "On" : "Off"} <br />
                  Accent: {accent}
                </p>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`mt-3 px-3 py-1 rounded ${theme === "dark" ? accentMap[accent].active : "bg-gray-300"}`}
                >
                  Go to Section →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "study" && <StudyTracker items={studyItems} setItems={setStudyItems} />}
        {activeTab === "uploads" && <Upload uploads={uploads} setUploads={setUploads} />}
        {activeTab === "quiz" && <Quiz />}
        {activeTab === "progress" && <Progress />}
        {activeTab === "daily" && <DailyTracker />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
}
