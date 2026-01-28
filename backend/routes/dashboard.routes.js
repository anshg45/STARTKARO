import express from "express";
import Project from "../models/Project.js";
import Startup from "../models/Startup.js";
import Freelance from "../models/Freelance.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", auth, async (req, res) => {
  try {
    const [projects, startups, freelance, events, users] = await Promise.all([
      Project.countDocuments(),
      Startup.countDocuments(),
      Freelance.countDocuments(),
      Event.countDocuments(),
      User.countDocuments({
        role: { $ne: "admin" },
        email: { 
          $not: /^superadmin/i, 
          $ne: "admin@startkaro.com" 
        }
      })
    ]);

    res.json({
      projects,
      startups,
      freelance,
      events,
      users
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

export default router;
