import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    minlength: 5,
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

const User = mongoose.model("User", userSchema);
export default User;
