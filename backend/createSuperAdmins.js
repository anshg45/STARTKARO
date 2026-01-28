import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createSuperAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Connected to DB...");

    const superAdmins = [];
    const credentials = [];

    for (let i = 1; i <= 5; i++) {
      const email = `superadmin${i}@startkaro.com`;
      const plainPassword = `SuperKey@2026_${i}`;
      const name = `Super Admin ${i}`;

      // Check if exists
      const existing = await User.findOne({ email });
      if (existing) {
        console.log(`⚠️ User ${email} already exists. Skipping...`);
        credentials.push(`EXISTING -> Email: ${email} | Password: (Unknown/Unchanged)`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      superAdmins.push({
        name,
        email,
        password: hashedPassword,
        role: "admin" // Granting admin privileges
      });

      credentials.push(`Email: ${email} | Password: ${plainPassword}`);
    }

    if (superAdmins.length > 0) {
      await User.insertMany(superAdmins);
      console.log(`✅ ${superAdmins.length} Super Admins created successfully!`);
    } else {
      console.log("ℹ️ No new users created.");
    }

    // Write credentials to file
    const content = `=== SUPER ADMIN KEYS (Generated on ${new Date().toLocaleString()}) ===\n\n` + credentials.join("\n") + "\n\n=== USE THESE KEYS TO LOGIN AND MANAGE PROJECTS ===";
    
    fs.writeFileSync("super_admin_keys.txt", content);
    console.log("📄 Keys saved to backend/super_admin_keys.txt");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

createSuperAdmins();
