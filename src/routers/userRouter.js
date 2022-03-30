"use strict";
import express from "express";
import {
  getEmailVerification,
  postEmailVerification,
  getUserEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", getUserEdit);
userRouter.get("/email-verification/", getEmailVerification);
userRouter.get("/email-verification/:id([0-9a-f]{24})", postEmailVerification);

export default userRouter;
