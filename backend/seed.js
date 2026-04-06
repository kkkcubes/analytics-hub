/* eslint-disable no-undef */

const mongoose = require("mongoose");
const Analytics = require("./models/Analytics");

mongoose
  .connect("mongodb://127.0.0.1:27017/quantix")
  .then(async () => {
    console.log("✅ MongoDB Connected (Seeding)");

    // 🔥 CLEAR OLD DATA
    await Analytics.deleteMany();

    // 🔥 INSERT CLEAN DATA (ALL HAVE year + correct region ✅)
    await Analytics.insertMany([
      // =====================
      // ✅ 2024 INDIA
      // =====================
      { month: "Jan", region: "india", sales: 400, traffic: 200, revenue: 1000, profit: 300, year: 2024 },
      { month: "Feb", region: "india", sales: 600, traffic: 300, revenue: 1500, profit: 500, year: 2024 },
      { month: "Mar", region: "india", sales: 300, traffic: 250, revenue: 900, profit: 200, year: 2024 },
      { month: "Apr", region: "india", sales: 800, traffic: 400, revenue: 2000, profit: 700, year: 2024 },
      { month: "May", region: "india", sales: 500, traffic: 350, revenue: 1200, profit: 400, year: 2024 },
      { month: "Jun", region: "india", sales: 700, traffic: 380, revenue: 1700, profit: 600, year: 2024 },

      // =====================
      // ✅ 2024 USA
      // =====================
      { month: "Jan", region: "usa", sales: 700, traffic: 300, revenue: 2000, profit: 800, year: 2024 },
      { month: "Feb", region: "usa", sales: 900, traffic: 450, revenue: 2500, profit: 900, year: 2024 },
      { month: "Mar", region: "usa", sales: 650, traffic: 360, revenue: 1600, profit: 550, year: 2024 },
      { month: "Apr", region: "usa", sales: 900, traffic: 450, revenue: 2200, profit: 800, year: 2024 },

      // =====================
      // ✅ 2024 EUROPE
      // =====================
      { month: "Jan", region: "eu", sales: 300, traffic: 200, revenue: 900, profit: 250, year: 2024 },
      { month: "Feb", region: "eu", sales: 500, traffic: 300, revenue: 1400, profit: 400, year: 2024 },
      { month: "Mar", region: "eu", sales: 720, traffic: 390, revenue: 1800, profit: 650, year: 2024 },

      // =====================
      // ✅ 2023 INDIA (LAST MONTH FILTER)
      // =====================
      { month: "Jan", region: "india", sales: 200, traffic: 150, revenue: 800, profit: 200, year: 2023 },
      { month: "Feb", region: "india", sales: 300, traffic: 200, revenue: 1000, profit: 300, year: 2023 },

      // =====================
      // ✅ 2023 USA
      // =====================
      { month: "Jan", region: "usa", sales: 500, traffic: 250, revenue: 1500, profit: 500, year: 2023 }
    ]);

    console.log("🔥 Data seeded successfully");
    process.exit();
  })
  .catch((err) => console.log(err));