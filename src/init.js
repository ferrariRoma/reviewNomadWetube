"use strict";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const handleListen = () => {
  console.log("✅ Connected localhost:4000");
};

app.listen(4000, handleListen);
