import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true }, // Startup, Freelance, etc.
    file: { type: String }, // URL to pdf/doc/ppt
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
