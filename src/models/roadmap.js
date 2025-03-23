import mongoose from "mongoose";

const RoadmapSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  guide: {
    type: String,
  },
  career: {
    unique: true,
    ref: "Career",
    required: true,
    type: mongoose.Types.ObjectId,
  },
});

export default mongoose.model("Roadmap", RoadmapSchema);
