"use strict";
import express from "express";
import { get } from "express/lib/response";
import {
  getEmailVerification,
  postEmailVerification,
  getUserEdit,
  startNaverLogin,
  finishNaverLogin,
  postUserEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  avatarUploadMiddleware,
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
  .post(avatarUploadMiddleware.single("avatarUrl"), postUserEdit);
userRouter
  .route("/change-password")
  .all(loggedOnlyMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(
  "/email-verification/",
  loggedOnlyMiddleware,
  emailNotVerifiMiddleware,
  getEmailVerification
);
userRouter.get(
  "/email-verification/:id([0-9a-f]{24})",
  loggedOnlyMiddleware,
  emailNotVerifiMiddleware,
  postEmailVerification
);
userRouter.get("/naver/start", publicOnlyMiddleware, startNaverLogin);
userRouter.get("/naver/finish", publicOnlyMiddleware, finishNaverLogin);

export default userRouter;
