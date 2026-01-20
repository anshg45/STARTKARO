import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";
import User from "./models/User.js";

dotenv.config();

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find a user to assign events to
    const user = await User.findOne();
    if (!user) {
      console.log("❌ No user found to assign events. Please signup first.");
      process.exit(1);
    }

    const events = [
      {
        title: "AURA Hackathon 2026",
        description: "A 48-hour national level hackathon where students build innovative solutions for real-world problems. Prizes worth ₹1 Lakh!",
        date: new Date("2026-03-15"),
        location: "Main Auditorium, Delhi Tech University",
        organizer: user._id
      },
      {
        title: "AI & Future Tech Workshop",
        description: "Hands-on workshop on Generative AI, LLMs, and Prompt Engineering by industry experts from Google.",
        date: new Date("2026-02-10"),
        location: "Seminar Hall 2 (Also on Zoom)",
        organizer: user._id
      },
      {
        title: "Startup Pitch Day",
        description: "Pitch your startup idea to top VCs and angel investors. Open for all college students.",
        date: new Date("2026-04-05"),
        location: "Innovation Hub, IIT Delhi",
        organizer: user._id
      },
      {
        title: "Open Source Contribution Sprint",
        description: "Learn how to contribute to open source projects. Mentorship provided for first-time contributors.",
        date: new Date("2026-02-28"),
        location: "Computer Labs 1 & 2",
        organizer: user._id
      }
    ];

    await Event.deleteMany({}); // Clear existing
    await Event.insertMany(events);

    console.log("✅ Dummy events seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedEvents();
