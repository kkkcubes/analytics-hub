import { useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="header" style={{ position: "relative" }}>
      <h2>Analytics Hub</h2>

      <div className="header-right" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        
        {/* 🔔 Notification */}
        <span onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
          🔔
        </span>

        {/* 🔽 Notification Dropdown */}
        {show && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              background: "#020617",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)"
            }}
          >
            <p style={{ margin: 0 }}>No new notifications</p>
          </div>
        )}

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}