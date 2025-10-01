// src/pages/ResetPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [stage, setStage] = useState(0); // 0 = request, 1 = set new

  const requestReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ignite-users") || "[]");
    if (!users.find(u => u.email === email)) {
      alert("No account found for that email (demo)");
      return;
    }
    setSent(true);
    setStage(1);
  };

  const setPassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ignite-users") || "[]");
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) { alert("No user found"); return; }
    users[idx].password = newPass;
    localStorage.setItem("ignite-users", JSON.stringify(users));
    alert("Password reset. Login with new password.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        {!stage && (
          <>
            <h2 className="text-2xl font-bold mb-4 gradient-text">Reset password</h2>
            <form onSubmit={requestReset} className="space-y-4">
              <input required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded bg-black/30" />
              <button type="submit" className="btn-accent w-full">Send reset link (demo)</button>
            </form>
            <p className="mt-4 text-sm">Back to <Link to="/login" className="text-yellow-400">Login</Link></p>
          </>
        )}

        {stage === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 gradient-text">Enter new password</h2>
            <form onSubmit={setPassword} className="space-y-4">
              <input required value={newPass} onChange={e => setNewPass(e.target.value)} type="password" placeholder="New password" className="w-full p-3 rounded bg-black/30" />
              <button type="submit" className="btn-accent w-full">Set password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
