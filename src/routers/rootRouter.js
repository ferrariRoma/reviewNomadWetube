import express from "express";
import { home, searchVideo } from "../controllers/videoController";

const rootRouter = express.Router();

const middleware = (req, res, next) => {
  //   console.log(req);
  console.log(res.req.url);
  next();
};

rootRouter.get("/", middleware, home);
rootRouter.get("/search", searchVideo);

export default rootRouter;
