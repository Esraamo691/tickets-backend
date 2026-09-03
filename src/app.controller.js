import cors from "cors";
import express from "express";

export const bootstrap = (app, express) => {
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root & Health Check Endpoints
  app.get("/", (req, res) => {
    return res.status(200).json({
      status: "success",
      message: "Welcome to Tickets Backend API 🎫",
      environment: process.env.NODE_ENV || "development",
      port: process.env.PORT || 3016,
    });
  });

  app.get("/health", (req, res) => {
    return res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Global 404 Route Handler
  app.use((req, res) => {
    return res.status(404).json({
      status: "error",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    });
  });

  // Global Error Handler
  app.use((err, req, res, next) => {
    const statusCode = err.status || err.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });
};
