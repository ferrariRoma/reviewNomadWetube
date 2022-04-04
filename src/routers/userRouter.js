"use strict";
import express from "express";
import {
  getEmailVerification,
  postEmailVerification,
  getUserEdit,
  startNaverLogin,
  finishNaverLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", getUserEdit);
userRouter.get("/email-verification/", getEmailVerification);
userRouter.get("/email-verification/:id([0-9a-f]{24})", postEmailVerification);
userRouter.get("/naver/start", startNaverLogin);
userRouter.get("/naver/finish", finishNaverLogin);

export default userRouter;
