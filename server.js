const express = require("express");

const app = express();

const handleHome = (req, res) => {
  res.send("Home");
};

app.get("/", handleHome);

const handleListen = () => {
  console.log("Connected localhost:4000 ✅");
};

app.listen(4000, handleListen);
