import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now(), required: true },
  hashtags: [{ type: String }],
  //   fileUrl: {type: String, required: true},
  //   thumbUrl: {type: String, required: true},
});

const Video = mongoose.model("Video", videoSchema);
