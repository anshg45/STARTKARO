import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    sector: { type: String, required: true }, // EdTech, FinTech, etc.
    logo: { type: String }, // URL
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Startup", startupSchema);
