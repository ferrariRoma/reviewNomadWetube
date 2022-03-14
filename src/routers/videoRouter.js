import express from "express";
import {
  getUpload,
  postUpload,
  watchVideo,
  getEdit,
  postEdit,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id(\\d+)", watchVideo);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
