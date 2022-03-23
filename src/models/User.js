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
    required: true,
    trim: true,
    maxlength: 30,
    minlength: 8,
  },
  email: { type: String, required: true, unique: true },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
