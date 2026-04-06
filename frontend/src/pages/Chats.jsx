import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "../components/Layout";

// ✅ connect to backend socket
const socket = io("http://localhost:5000");

export default function Chats() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // 👤 GET USER (from login)
  const user = localStorage.getItem("user") || "Guest";

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      text,
      user,
    };

    socket.emit("send_message", messageData);

    // ✅ optimistic UI (instant message)
    setMessages((prev) => [...prev, messageData]);

    setText("");
  };

  // ✅ RECEIVE MESSAGE (FINAL FIX - NO DUPLICATES)
  useEffect(() => {
    socket.off("receive_message"); // 🔥 remove old listeners

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message"); // cleanup
    };
  }, []);

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Chat</h2>

        {/* 💬 CHAT BOX */}
        <div
          className="chat-box"
          style={{
            height: "300px",
            overflowY: "auto",
            background: "#020617",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          {messages.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No messages yet</p>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={m.user === user ? "my-msg" : "other-msg"}
                style={{
                  textAlign: m.user === user ? "right" : "left",
                  margin: "8px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    background:
                      m.user === user ? "#3b82f6" : "#1e293b",
                    color: "white",
                    maxWidth: "70%",
                  }}
                >
                  <strong>{m.user}</strong>: {m.text}
                </span>
              </div>
            ))
          )}
        </div>

        {/* ✏️ INPUT */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "10px 15px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}