import mongoose from "mongoose";

const freelanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    skills: [String],
    budget: String,
    whatsapp: String,
    linkedin: String,
    githubProfile: String,
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Freelance", freelanceSchema);
