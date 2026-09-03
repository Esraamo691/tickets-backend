import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { bootstrap } from "./app.controller.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3016;
const DB_URI = process.env.DB_URI;

// Initialize app controller & middleware
bootstrap(app, express);

// Optional DB connection if DB_URI is set
if (DB_URI) {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log(`[Database] MongoDB connected successfully`);
    })
    .catch((err) => {
      console.warn(`[Database] MongoDB connection warning: ${err.message}`);
    });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Tickets Backend Server is running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});
