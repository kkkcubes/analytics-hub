/* eslint-disable no-undef */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Middleware
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");

// ✅ Models
const User = require("./models/User");
const Analytics = require("./models/Analytics");

// ✅ Socket setup
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

/* =========================
   ✅ MongoDB CONNECTION
========================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/quantix")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* =========================
   🔐 REGISTER
========================= */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).send("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashed,
      role: "user",
    });

    await user.save();

    res.send({ message: "✅ User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("❌ Server error");
  }
});

/* =========================
   🔐 LOGIN
========================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "secret123",
      { expiresIn: "1d" }
    );

    res.send({
      token,
      user: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("❌ Server error");
  }
});

/* =========================
   👨‍💼 ADMIN - GET USERS
========================= */
app.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch {
    res.status(500).send("❌ Server error");
  }
});

/* =========================
   🗑 DELETE USER
========================= */
app.delete("/users/:id", auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("✅ User deleted");
  } catch {
    res.status(500).send("❌ Delete error");
  }
});

/* =========================
   🔄 CHANGE ROLE
========================= */
app.put("/users/:id/role", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send("User not found");

    user.role = user.role === "admin" ? "user" : "admin";

    await user.save();

    res.send(user);
  } catch {
    res.status(500).send("❌ Role update error");
  }
});

/* =========================
   📊 DASHBOARD API (FINAL UPGRADED)
========================= */
app.get("/dashboard", auth, async (req, res) => {
  try {
    const { month, region } = req.query;

    let filter = {};

    if (month === "this") filter.year = 2024;
    if (month === "last") filter.year = 2023;

    if (region !== "all") {
      filter.region = region.toLowerCase();
    }

    console.log("FILTER:", filter);

    // ✅ FETCH DATA
    const data = await Analytics.find(filter);

    // 🔥 GROUP DATA
    const grouped = {};

    data.forEach((d) => {
      if (!grouped[d.month]) {
        grouped[d.month] = { sales: 0, traffic: 0 };
      }

      grouped[d.month].sales += d.sales;
      grouped[d.month].traffic += d.traffic;
    });

    // 🔁 CONVERT
    const sales = Object.keys(grouped).map((month) => ({
      name: month,
      value: grouped[month].sales,
    }));

    const traffic = Object.keys(grouped).map((month) => ({
      name: month,
      value: grouped[month].traffic,
    }));

    // 🔥 SORT MONTHS
    const order = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    sales.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    traffic.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    // 💰 KPI
    const revenue = data.reduce((sum, d) => sum + (d.revenue || 0), 0);
    const profit = data.reduce((sum, d) => sum + (d.profit || 0), 0);

    res.send({
      sales,
      traffic,
      sources: [
        { name: "Organic", value: 60 },
        { name: "Direct", value: 25 },
        { name: "Referral", value: 15 },
      ],
      kpi: revenue,
      profit,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("❌ Dashboard error");
  }
});

/* =========================
   💬 SOCKET.IO CHAT
========================= */
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", {
      text: data.text,
      user: data.user,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

/* =========================
   🚀 START SERVER
========================= */
server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});