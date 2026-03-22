import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
});

export default mongoose.model("Course", courseSchema);
