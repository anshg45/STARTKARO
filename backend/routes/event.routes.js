import express from "express";
import Event from "../models/Event.js";
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

export default router;
