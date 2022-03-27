"use strict";
import app from "./server";
import "./db";
import "./models/Video";
import "./models/User";

const handleListen = () => {
  console.log("✅ Connected localhost:4000");
};

app.listen(4000, handleListen);
