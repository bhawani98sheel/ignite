// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import LogoHeader from "../components/LogoHeader";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Apply stored gradient on load
  useEffect(() => {
    const g = JSON.parse(localStorage.getItem("ignite-gradient") || "null");
    if (g) {
      document.documentElement.style.setProperty("--grad-1", g[0]);
      document.documentElement.style.setProperty("--grad-2", g[1]);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ignite-users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("ignite-current-user", JSON.stringify(user));
      localStorage.setItem("ignite-username", user.username || user.email);
      navigate("/dashboard");
    } else {
      alert("❌ Invalid email or password");
    }
  };

  const socialRedirect = (provider) => {
    if (provider === "Google") {
      window.location.href = "https://accounts.google.com/signin";
    } else if (provider === "GitHub") {
      window.location.href = "https://github.com/login";
    } else if (provider === "Facebook") {
      window.location.href = "https://facebook.com/login";
    }
  };

  return (
    <div className="login-bg">
      {/* 🔥 LogoHeader fixed top-left */}
      <LogoHeader />

      {/* 🔐 Centered login card */}
      <div className="absolute inset-0 flex items-center justify-center w-full">
        <div className="w-full max-w-md card p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Welcome Back ✨
            </h2>
            <p className="text-gray-300">
              Log in to continue your journey 🚀
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--grad-1)]"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--grad-2)]"
            />
            <button type="submit" className="btn-accent w-full">
              🔑 Login
            </button>
          </form>

          {/* Forgot Password */}
          <p className="mt-3 text-sm text-center">
            <Link to="/reset-password" className="text-yellow-400 hover:underline">
              Forgot Password?
            </Link>
          </p>

          {/* Divider */}
          <div className="my-6 border-t border-gray-600 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b0504] px-2 text-gray-400 text-sm">
              OR
            </span>
          </div>

          {/* Social logins */}
          <div className="space-y-3">
            <button
              onClick={() => socialRedirect("Google")}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-200 py-2 rounded-lg transition"
            >
              <FaGoogle className="text-red-500" /> Sign in with Google
            </button>
            <button
              onClick={() => socialRedirect("GitHub")}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg transition"
            >
              <FaGithub /> Sign in with GitHub
            </button>
            <button
              onClick={() => socialRedirect("Facebook")}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              <FaFacebook /> Sign in with Facebook
            </button>
          </div>

          {/* Register link */}
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
