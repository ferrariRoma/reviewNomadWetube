"use strict";
import express from "express";
import {
  getEmailVerification,
  getUserEdit,
  postEmailVerification,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", getUserEdit);
userRouter.route("/email-verification").get(postEmailVerification);

export default userRouter;
