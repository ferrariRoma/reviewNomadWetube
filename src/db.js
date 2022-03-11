import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/recap");

const db = mongoose.connection;
