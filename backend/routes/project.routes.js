import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ✅ GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Fetch projects failed" });
  }
});

// ✅ CREATE PROJECT
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, githubUrl, members, positions, whatsapp, linkedin, githubProfile } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const project = await Project.create({
      title,
      description,
      githubUrl,
      members,
      positions,
      whatsapp,
      linkedin,
      githubProfile,
      image,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Project create failed" });
  }
});

// ✅ GET MY PROJECTS
router.get("/my", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Fetch projects failed" });
  }
});

// ✅ DELETE PROJECT (Owner or Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Fetch full user details to ensure we have the email/role
    const requestUser = await User.findById(req.user.id);
    if (!requestUser) return res.status(401).json({ message: "User not found" });

    // Check if user is owner or admin (or Super Admin by email)
    if (project.user.toString() !== req.user.id && requestUser.role !== "admin" && requestUser.email !== "admin@startkaro.com") {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
