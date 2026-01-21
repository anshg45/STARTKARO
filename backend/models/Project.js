import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tech: [String],
    githubUrl: String,
    image: String, // Screenshot
    members: { type: Number, default: 1 },
    positions: String, // e.g. "Frontend Dev, UI Designer"
    whatsapp: String,
    linkedin: String,
    githubProfile: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
