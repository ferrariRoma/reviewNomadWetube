"use strict";
import express from "express";
import {
  getEmailVerification,
  postEmailVerification,
  getUserEdit,
  startNaverLogin,
  finishNaverLogin,
  postUserEdit,
} from "../controllers/userController";
import {
  emailNotVerifiMiddleware,
  emailVerifiMiddleware,
  loggedOnlyMiddleware,
  publicOnlyMiddleware,
} from "../middleware";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(loggedOnlyMiddleware)
  .get(getUserEdit)
  .post(postUserEdit);
userRouter.get(
  "/email-verification/",
  emailNotVerifiMiddleware,
  getEmailVerification
);
userRouter.get(
  "/email-verification/:id([0-9a-f]{24})",
  emailNotVerifiMiddleware,
  postEmailVerification
);
userRouter.get("/naver/start", publicOnlyMiddleware, startNaverLogin);
userRouter.get("/naver/finish", publicOnlyMiddleware, finishNaverLogin);

export default userRouter;
