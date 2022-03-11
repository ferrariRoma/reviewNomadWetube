import express from "express";
import { home, searchVideo } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", searchVideo);

export default rootRouter;
