import express from "express";
import Listing from "../models/Listing.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

console.log("DEBUG: Loading marketplace.routes.js");

const router = express.Router();

// GET all listings (with filters)
router.get("/", async (req, res) => {
  console.log("DEBUG: GET / handler reached");
  try {
    const { type, my } = req.query;
    console.log("DEBUG: GET /api/marketplace query:", req.query);
    
    let filter = {};

    if (type) {
      filter.type = type;
    }

    // Debugging: Check total count
    const totalCount = await Listing.countDocuments();
    console.log("DEBUG: Total listings in DB:", totalCount);

    const listings = await Listing.find(filter).populate("owner", "name email");
    console.log(`DEBUG: Found ${listings.length} listings with filter:`, filter);
    
    res.json(listings);
  } catch (err) {
    console.error("DEBUG: Error fetching listings:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});

// GET my listings
router.get("/my", auth, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});

// CREATE a listing
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, category, type, whatsapp, linkedin, githubProfile } = req.body;
    let image = req.body.image; // Allow manual URL if needed

    if (req.file) {
      // Create full URL for the uploaded image
      image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    
    const newListing = await Listing.create({
      title,
      description,
      price,
      category,
      type,
      whatsapp,
      linkedin,
      githubProfile,
      image,
      owner: req.user.id
    });

    res.status(201).json(newListing);
  } catch (err) {
    console.error("Create listing error:", err);
    res.status(500).json({ message: "Failed to create listing" });
  }
});

// DELETE a listing (Owner or Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Fetch full user details to ensure we have the email/role
    const requestUser = await User.findById(req.user.id);
    if (!requestUser) return res.status(401).json({ message: "User not found" });

    // Check if user is owner or admin (or Super Admin by email)
    if (listing.owner.toString() !== req.user.id && requestUser.role !== "admin" && requestUser.email !== "admin@startkaro.com") {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete listing" });
  }
});

export default router;
