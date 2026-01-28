import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

console.log("✅ Project Routes Loaded");

router.use((req, res, next) => {
  console.log(`[Project Routes] ${req.method} ${req.url}`);
  next();
});

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
  const projectId = req.params.id.trim();
  console.log(`[ROUTE HIT] DELETE /api/projects/${projectId}`);
  
  try {
    console.log(`[DELETE DEBUG] Attempting to delete project with ID: '${projectId}'`);
    
    // Check for valid ObjectId format
    if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(`[DELETE DEBUG] Invalid ID format: '${projectId}'`);
        return res.status(400).json({ message: "Invalid Project ID format" });
    }

    const project = await Project.findById(projectId);
    console.log(`[DELETE DEBUG] Project found:`, project ? "YES" : "NO");

    if (!project) return res.status(404).json({ message: "Project not found in database" });

    // Fetch full user details to ensure we have the email/role
    const requestUser = await User.findById(req.user.id);
    if (!requestUser) return res.status(401).json({ message: "User not found" });

    // Check if user is owner or admin (or Super Admin by email/name)
    const isOwner = project.user.toString() === req.user.id;
    const isAdmin = requestUser.role === "admin" || req.user.role === "admin";
    const isSuperAdmin = 
      (requestUser.email && requestUser.email.toLowerCase().trim() === "admin@startkaro.com") || 
      (req.user.email && req.user.email.toLowerCase().trim() === "admin@startkaro.com");
    
    console.log(`Delete Debug: User=${requestUser.email}, TokenEmail=${req.user.email}, Role=${requestUser.role}, TokenRole=${req.user.role}, IsOwner=${isOwner}, IsAdmin=${isAdmin}, IsSuperAdmin=${isSuperAdmin}`);

    if (!isOwner && !isAdmin && !isSuperAdmin) {
      return res.status(403).json({ 
        message: `Not authorized. You are: ${requestUser.email} (Role: ${requestUser.role})`,
        debug: { userEmail: requestUser.email, tokenEmail: req.user.email, role: requestUser.role, tokenRole: req.user.role }
      });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
