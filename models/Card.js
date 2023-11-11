import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Card", CardSchema);
