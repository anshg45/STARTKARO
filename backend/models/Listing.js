import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, // e.g. "₹500/day" or "₹1200"
    category: { type: String, required: true }, // Electronics, Books, etc.
    type: { type: String, enum: ["Rent", "Buy"], default: "Rent" },
    image: String,
    whatsapp: String,
    linkedin: String,
    githubProfile: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
