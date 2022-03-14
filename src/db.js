import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/recap");

// connection이벤트
const db = mongoose.connection;

// error eventListener
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);

// open eventListener
const handleOpen = () => console.log("✅ Connection DB");
db.on("open", handleOpen);
