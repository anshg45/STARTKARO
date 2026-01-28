import express from "express";
import Event from "../models/Event.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* CREATE EVENT */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      image,
      organizer: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
});

/* GET ALL EVENTS */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

/* DELETE EVENT */
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Fetch full user details
    const requestUser = await User.findById(req.user.id);
    if (!requestUser) return res.status(401).json({ message: "User not found" });

    // Check if user is organizer or admin
    const isOwner = event.organizer.toString() === req.user.id;
    const isAdmin = requestUser.role === "admin" || req.user.role === "admin";
    const isSuperAdmin = 
      (requestUser.email && (requestUser.email.toLowerCase().trim() === "admin@startkaro.com" || requestUser.email.toLowerCase().trim().startsWith("superadmin"))) || 
      (req.user.email && (req.user.email.toLowerCase().trim() === "admin@startkaro.com" || req.user.email.toLowerCase().trim().startsWith("superadmin")));

    if (!isOwner && !isAdmin && !isSuperAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;
