// src/components/LogoHeader.jsx
import { useNavigate } from "react-router-dom";

export default function LogoHeader() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-5 left-6 flex flex-col items-start cursor-pointer z-50"
      onClick={() => navigate("/home")}
    >
      <h1 className="text-2xl md:text-3xl font-extrabold gradient-text leading-tight">
        🔥 Ignite
      </h1>
    </div>
  );
}
