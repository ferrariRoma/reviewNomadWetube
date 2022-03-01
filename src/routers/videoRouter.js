import express from "express";
import { uploadVideo, watchVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id", watchVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;
