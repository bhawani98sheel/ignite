// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoHeader from "../components/LogoHeader";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
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

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ignite-users") || "[]");

    if (users.find((u) => u.email === email)) {
      alert("⚠️ User already exists. Please log in.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);

    localStorage.setItem("ignite-users", JSON.stringify(users));
    localStorage.setItem("ignite-current-user", JSON.stringify(newUser));
    localStorage.setItem("ignite-username", username || email);

    alert("✅ Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="login-bg">
      {/* 🔥 Consistent Logo Header */}
      <LogoHeader />

      {/* Centered Card */}
      <div className="flex min-h-screen items-center justify-center px-4 w-full">
        <div className="w-full max-w-md card p-8">
          <h2 className="text-3xl font-bold mb-4 gradient-text text-center">
            Create Account
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Sign up and start tracking today 🚀
          </p>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Full name"
              className="w-full p-3 rounded bg-black/40 border border-gray-600 focus:outline-none"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded bg-black/40 border border-gray-600 focus:outline-none"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded bg-black/40 border border-gray-600 focus:outline-none"
            />
            <button type="submit" className="btn-accent w-full">
              🎉 Create Account
            </button>
          </form>

          {/* Already registered? */}
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
