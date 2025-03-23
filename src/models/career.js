import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for roadmap
CareerSchema.virtual("roadmap", {
  justOne: true,
  ref: "Roadmap",
  localField: "_id",
  foreignField: "career",
});

const Career = mongoose.model("Career", CareerSchema);

export default Career;
