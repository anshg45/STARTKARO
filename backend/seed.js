import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import Startup from "./models/Startup.js";
import Freelance from "./models/Freelance.js";
import Event from "./models/Event.js";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected for seeding...");

  const user = await User.findOne();
  if (!user) {
    console.log("No user found, cannot seed linked data.");
    process.exit();
  }

  // Create dummy data if empty
  const sCount = await Startup.countDocuments();
  if (sCount === 0) {
    await Startup.create([
      { name: "TechNova", description: "AI Startup", industry: "Tech", founder: user._id },
      { name: "GreenEarth", description: "Sustainable energy", industry: "Energy", founder: user._id },
      { name: "Foodie", description: "Food delivery", industry: "Food", founder: user._id },
    ]);
    console.log("Seeded 3 Startups");
  }

  const fCount = await Freelance.countDocuments();
  if (fCount === 0) {
    await Freelance.create([
      { title: "React Dev", description: "Build website", skills: ["React"], budget: "$500", client: user._id },
      { title: "Logo Design", description: "Need logo", skills: ["Design"], budget: "$100", client: user._id },
      { title: "SEO Expert", description: "Rank high", skills: ["SEO"], budget: "$300", client: user._id },
    ]);
    console.log("Seeded 3 Freelance Gigs");
  }

  const eCount = await Event.countDocuments();
  if (eCount === 0) {
    await Event.create([
      { title: "Hackathon 2024", description: "Coding", date: new Date(), location: "Online", organizer: user._id },
      { title: "Startup Meetup", description: "Networking", date: new Date(), location: "Delhi", organizer: user._id },
      { title: "AI Workshop", description: "Learn AI", date: new Date(), location: "Mumbai", organizer: user._id },
    ]);
    console.log("Seeded 3 Events");
  }

  console.log("Seeding complete.");
  process.exit();
});
