import express from "express";
import Startup from "../models/Startup.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET all startups
router.get("/", async (req, res) => {
  try {
    const startups = await Startup.find().populate("founder", "name email");
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch startups" });
  }
});

// CREATE a startup
router.post("/", auth, upload.single("logo"), async (req, res) => {
  try {
    const { name, description, sector } = req.body;
    let logo = req.body.logo;

    if (req.file) {
      logo = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const startup = await Startup.create({
      name,
      description,
      sector,
      logo,
      founder: req.user.id
    });
    res.status(201).json(startup);
  } catch (err) {
    console.error("Create startup error:", err);
    res.status(500).json({ message: "Failed to create startup" });
  }
});

// DELETE a startup (Owner or Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ message: "Startup not found" });

    // Check if user is founder or admin (or Super Admin by email)
    if (startup.founder.toString() !== req.user.id && req.user.role !== "admin" && req.user.email !== "admin@startkaro.com") {
      return res.status(403).json({ message: "Not authorized to delete this startup" });
    }

    await startup.deleteOne();
    res.json({ message: "Startup deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
