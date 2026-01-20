import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import Startup from "./models/Startup.js";
import Freelance from "./models/Freelance.js";
import Event from "./models/Event.js";
import User from "./models/User.js";

dotenv.config();

console.log("Connecting to:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const projects = await Project.countDocuments();
    const startups = await Startup.countDocuments();
    const freelance = await Freelance.countDocuments();
    const events = await Event.countDocuments();
    const users = await User.countDocuments();

    console.log("--- DB COUNTS ---");
    console.log("Projects:", projects);
    console.log("Startups:", startups);
    console.log("Freelance:", freelance);
    console.log("Events:", events);
    console.log("Users:", users);
    console.log("-----------------");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Connection error:", err);
  });
