import { NavLink } from "react-router-dom";
import { Home, FileText, MessageCircle, Settings } from "lucide-react";

export default function Sidebar() {
  // 🔐 Get token
  const token = localStorage.getItem("token");

  // 🔐 Extract role safely
  let role = "";

  if (token) {
    try {
      role = JSON.parse(atob(token.split(".")[1])).role;
    } catch {
      console.log("Invalid token");
    }
  }

  return (
    <div className="sidebar">
      <div className="logo">Quantix</div>

      {/* Dashboard */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <Home size={18} /> Dashboard
      </NavLink>

      {/* Reports */}
      <NavLink
        to="/reports"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <FileText size={18} /> Reports
      </NavLink>

      {/* Chats */}
      <NavLink
        to="/chats"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <MessageCircle size={18} /> Chats
      </NavLink>

      {/* Settings */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <Settings size={18} /> Settings
      </NavLink>

      {/* 👨‍💼 ADMIN ONLY */}
      {role === "admin" && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          ⚙ Admin
        </NavLink>
      )}
    </div>
  );
}