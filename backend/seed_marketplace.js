import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";
import User from "./models/User.js";

dotenv.config();

const seedMarketplace = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find a user to assign listings to
    const user = await User.findOne();
    if (!user) {
      console.log("❌ No user found to assign listings. Please signup first.");
      process.exit(1);
    }

    const listings = [
      // --- RENT ITEMS (3) ---
      {
        title: "Gaming Laptop (RTX 3060)",
        description: "High-end gaming laptop available for rent. Perfect for hackathons or gaming nights.",
        price: "₹800/day",
        category: "Electronics",
        type: "Rent",
        owner: user._id,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "DSLR Camera Canon 200D",
        description: "Capture your college events with professional quality. Lens included.",
        price: "₹500/day",
        category: "Electronics",
        type: "Rent",
        owner: user._id,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Arduino & Sensor Kit",
        description: "Complete kit for IoT projects. Includes Arduino Uno, breadboard, and jumper wires.",
        price: "₹150/day",
        category: "Electronics",
        type: "Rent",
        owner: user._id,
        image: "https://images.unsplash.com/photo-1555664424-778a6902201b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },

      // --- BUY ITEMS (3) ---
      {
        title: "Scientific Calculator fx-991EX",
        description: "Barely used scientific calculator. Essential for engineering exams.",
        price: "₹800",
        category: "Stationery",
        type: "Buy",
        owner: user._id,
        image: "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Data Structures & Algorithms Book",
        description: "Standard CLRS textbook. Good condition, no highlighting.",
        price: "₹600",
        category: "Books",
        type: "Buy",
        owner: user._id,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Drafting Table & Stool",
        description: "Adjustable drafting table for architecture/design students. Moving out sale.",
        price: "₹2,500",
        category: "Furniture",
        type: "Buy",
        owner: user._id,
        image: "https://images.unsplash.com/photo-1581092921461-eab6245b09bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ];

    await Listing.deleteMany({}); // Clear existing
    await Listing.insertMany(listings);

    console.log("✅ Marketplace listings seeded! (3 Rent, 3 Buy)");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedMarketplace();
