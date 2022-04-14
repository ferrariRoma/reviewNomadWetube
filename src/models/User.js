import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: { type: String, required: true, unique: true },
  emailVerification: { type: Boolean, default: false },
  socialUser: { type: Boolean, default: false },
  avatarUrl: String,
  userVideo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
