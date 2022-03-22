import express from "express";
import { home, searchVideo } from "../controllers/videoController";
import { getJoin, postJoin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", searchVideo);
rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;
