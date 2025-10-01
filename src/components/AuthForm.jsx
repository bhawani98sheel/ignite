import { useState } from "react";

export default function AuthForm({ mode, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, name });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/40 p-8 rounded-lg shadow-lg border border-orange-600/40 w-96 space-y-4"
    >
      <h2 className="text-2xl font-bold gradient-text text-center">
        {mode === "login" ? "Login to Ignite" : "Register for Ignite"}
      </h2>

      {mode === "register" && (
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-black/30 text-white border border-gray-600"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-black/30 text-white border border-gray-600"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-black/30 text-white border border-gray-600"
      />

      <button
        type="submit"
        className="w-full py-2 bg-orange-600 hover:bg-orange-700 rounded text-white"
      >
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
