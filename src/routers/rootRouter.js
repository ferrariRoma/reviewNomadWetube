"use strict";
import express from "express";
import { home, searchVideo } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { loggedOnlyMiddleware, publicOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", searchVideo);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/logout", loggedOnlyMiddleware, logout);

export default rootRouter;
