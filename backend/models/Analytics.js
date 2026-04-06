/* eslint-disable no-undef */

const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  traffic: {
    type: Number,
    default: 0,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  region: {
    type: String, // ✅ REQUIRED for filtering
    required: true,
  },
  year: {
    type: Number, // ✅ REQUIRED for filtering
    required: true,
  },
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);