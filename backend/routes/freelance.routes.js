import express from "express";
import Freelance from "../models/Freelance.js";
import User from "../models/User.js";
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

    // Fetch full user details to ensure we have the email/role
    const requestUser = await User.findById(req.user.id);
    if (!requestUser) return res.status(401).json({ message: "User not found" });

    // Check if user is client or admin (or Super Admin by email/name)
    const isOwner = gig.client.toString() === req.user.id;
    const isAdmin = requestUser.role === "admin";
    const isSuperAdmin = requestUser.email.toLowerCase().trim() === "admin@startkaro.com";

    if (!isOwner && !isAdmin && !isSuperAdmin) {
      return res.status(403).json({ message: `Not authorized. You are: ${requestUser.email}` });
    }

    await gig.deleteOne();
    res.json({ message: "Gig deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
