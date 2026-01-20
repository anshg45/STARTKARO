import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenvx from "@dotenvx/dotenvx";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import startupRoutes from "./routes/startup.routes.js";
import freelanceRoutes from "./routes/freelance.routes.js";
import guideRoutes from "./routes/guide.routes.js";
import eventRoutes from "./routes/event.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenvx.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // ✅ Serve Static Files

// Debug logging for request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
console.log("Registering Event Routes...");
app.use("/api/events", eventRoutes);
console.log("Registering Marketplace Routes...");
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/freelance", freelanceRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/ai", aiRoutes);

// Inline test route
app.get("/api/test-inline", (req, res) => {
  res.json({ message: "Inline route working" });
});

app.get("/", (req, res) => res.send("Backend is running! 🚀"));
app.get("/test", (req, res) => res.send("Server is working"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
