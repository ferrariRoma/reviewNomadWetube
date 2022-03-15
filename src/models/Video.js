import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now, required: true },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  //   fileUrl: {type: String, required: true},
  //   thumbUrl: {type: String, required: true},
  //   owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  //   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
