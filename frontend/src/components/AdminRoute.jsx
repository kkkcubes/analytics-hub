import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const role = JSON.parse(atob(token.split(".")[1])).role;

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}