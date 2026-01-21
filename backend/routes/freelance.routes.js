import express from "express";
import Freelance from "../models/Freelance.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all gigs
router.get("/", async (req, res) => {
  try {
    const gigs = await Freelance.find().populate("client", "name email");
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
});

// CREATE a gig
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, skills, budget, whatsapp, linkedin, githubProfile } = req.body;
    
    // Skills comes as string "React, Node" -> ["React", "Node"]
    const skillsArray = skills.split(",").map(s => s.trim());

    const gig = await Freelance.create({
      title,
      description,
      skills: skillsArray,
      budget,
      whatsapp,
      linkedin,
      githubProfile,
      client: req.user.id
    });
    res.status(201).json(gig);
  } catch (err) {
    console.error("Create gig error:", err);
    res.status(500).json({ message: "Failed to create gig" });
  }
});

// DELETE a gig (Owner or Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const gig = await Freelance.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // Check if user is client or admin (or Super Admin by email)
    if (gig.client.toString() !== req.user.id && req.user.role !== "admin" && req.user.email !== "admin@startkaro.com") {
      return res.status(403).json({ message: "Not authorized to delete this gig" });
    }

    await gig.deleteOne();
    res.json({ message: "Gig deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
