import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const generateUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    const users = [];
    const credentials = [];

    // Clear existing users to enforce "only these 50" (Optional, but safer for "sirf access kr sakte")
    // But maybe we should keep existing data? User said "jo hi sirf access kr sakte".
    // Safest is to just add them. If user wants to delete others, they can say so. 
    // I will check if they exist first.

    for (let i = 1; i <= 50; i++) {
      const id = i.toString().padStart(2, '0');
      const name = `Aura Member ${id}`;
      const email = `auramember${id}@startkaro.com`;
      const plainPassword = `aura2026_${id}`; // Pattern password
      
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      users.push({
        name,
        email,
        password: hashedPassword
      });

      credentials.push(`ID: ${email} | Password: ${plainPassword}`);
    }

    // Bulk write to DB
    // We use insertMany with ordered: false to skip duplicates if any
    try {
        await User.insertMany(users, { ordered: false });
        console.log("✅ 50 Aura Members created successfully!");
    } catch (e) {
        console.log("⚠️ Some users might already exist (duplicates skipped).");
    }

    // Write credentials to file
    fs.writeFileSync("aura_credentials.txt", credentials.join("\n"));
    console.log("📄 Credentials saved to backend/aura_credentials.txt");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

generateUsers();
