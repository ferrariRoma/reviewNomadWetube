"use strict";
import express from "express";
import Logger from "nodemon/lib/utils/log";
import {
  getUpload,
  postUpload,
  watchVideo,
  getEdit,
  postEdit,
  deleteVideo,
} from "../controllers/videoController";
import {
  emailVerifiMiddleware,
  loggedOnlyMiddleware,
  videoUploadMiddleware,
} from "../middleware";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(loggedOnlyMiddleware, emailVerifiMiddleware)
  .get(getUpload)
  .post(videoUploadMiddleware.single("videosUrl"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(loggedOnlyMiddleware, emailVerifiMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter.get(
  "/:id([0-9a-f]{24})/delete",
  loggedOnlyMiddleware,
  emailVerifiMiddleware,
  deleteVideo
);

export default videoRouter;
