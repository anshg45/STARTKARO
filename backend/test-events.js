import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";

dotenv.config();

const testEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const count = await Event.countDocuments();
    console.log(`📊 Total Events in DB: ${count}`);

    if (count > 0) {
      const events = await Event.find().limit(2);
      console.log("🔎 Sample Events:", JSON.stringify(events, null, 2));
    } else {
      console.log("⚠️ No events found in DB!");
    }

    // Also try fetching from the API if server is running
    try {
      const fetch = (await import("node-fetch")).default; // Dynamic import for node-fetch
      const res = await fetch("http://localhost:5000/api/events");
      if (res.ok) {
        const data = await res.json();
        console.log(`🌐 API /api/events returned ${data.length} items`);
      } else {
        console.log(`❌ API Error: ${res.status} ${res.statusText}`);
      }
    } catch (apiErr) {
      console.log("⚠️ Could not test API (Server might not be running or node-fetch issue):", apiErr.message);
    }

    process.exit();
  } catch (err) {
    console.error("❌ Test failed:", err);
    process.exit(1);
  }
};

testEvents();
