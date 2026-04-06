import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ added password
  const nav = useNavigate();

  // ✅ Login with email + password + JWT
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // ✅ send both
      });

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("token", data.token); // ✅ store token

        nav("/");
      } else {
        alert("Login failed (check email/password)");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#020617",
          padding: "30px",
          borderRadius: "10px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        {/* ✅ Email */}
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />

        {/* ✅ Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />

        {/* ✅ Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        {/* ✅ Register link */}
        <p
          style={{
            marginTop: "15px",
            cursor: "pointer",
            color: "#94a3b8",
            fontSize: "14px",
          }}
          onClick={() => nav("/register")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}