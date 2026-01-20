import express from "express";
import Guide from "../models/Guide.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET all guides
router.get("/", auth, async (req, res) => {
  try {
    const guides = await Guide.find().populate("author", "name");
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch guides" });
  }
});

// CREATE a guide
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let file = req.body.file;

    if (req.file) {
      file = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const guide = await Guide.create({
      title,
      content,
      category,
      file,
      author: req.user.id
    });
    res.status(201).json(guide);
  } catch (err) {
    console.error("Create guide error:", err);
    res.status(500).json({ message: "Failed to create guide" });
  }
});

export default router;
