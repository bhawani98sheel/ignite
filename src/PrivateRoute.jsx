import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  let currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem("ignite-current-user"));
  } catch {
    currentUser = null;
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}
