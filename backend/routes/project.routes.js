import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";
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
    const { title, description, githubUrl } = req.body; // ✅ INSIDE function
    let image = req.body.image;

    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const project = await Project.create({
      title,
      description,
      githubUrl,
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

export default router;
