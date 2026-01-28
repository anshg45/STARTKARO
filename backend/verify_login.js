import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const verifyLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    const email = "student1@startkaro.com";
    const password = "StartKaro@123";

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      process.exit(1);
    }

    console.log(`User found: ${user.email}`);
    console.log(`Stored Hash: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      console.log("✅ Password MATCHES! Login should work.");
    } else {
      console.log("❌ Password DOES NOT match.");
      
      // Debug: Hash it again to see what it looks like
      const newHash = await bcrypt.hash(password, 10);
      console.log(`Expected Hash format (example): ${newHash}`);
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

verifyLogin();
