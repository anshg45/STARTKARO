import mongoose from "mongoose";
import User from "./models/User.js";

const MONGO_URI = "mongodb+srv://anshpreetbindra47_db_user:startkaro1234@cluster0.lybt9qn.mongodb.net/startkaro?retryWrites=true&w=majority&appName=Cluster0";

const checkAdminInDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    
    const admin = await User.findOne({ email: "admin@startkaro.com" });
    
    if (admin) {
        console.log("✅ Admin Found:");
        console.log(`   ID: ${admin._id}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`); // This is what matters
        
        if (admin.role !== "admin") {
            console.log("⚠️ Role is NOT admin! Fixing it...");
            admin.role = "admin";
            await admin.save();
            console.log("✅ Role updated to 'admin'");
        }
    } else {
        console.log("❌ Admin user not found!");
    }

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.disconnect();
  }
};

checkAdminInDB();
