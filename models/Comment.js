import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comment", CommentSchema);
