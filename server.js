const express = require("express");

const app = express();

const handleHome = (req, res) => {
  res.send("Home");
};

const handleVideo = (req, res) => {
  res.send("Watch Video");
};

const handleProfile = (req, res) => {
  res.send("Edit Profile");
};

const testMiddleware = (req, res, next) => {
  console.log("Middleware test");
  next();
};

app.get("/", testMiddleware, handleHome);
app.get("/video", testMiddleware, handleVideo);
app.get("/profile", handleProfile);

const handleListen = () => {
  console.log("Connected localhost:4000 ✅");
};

app.listen(4000, handleListen);
