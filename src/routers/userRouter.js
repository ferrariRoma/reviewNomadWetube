"use strict";
import express from "express";
import {
  getUserEdit,
  postEmailVerification,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", getUserEdit);
userRouter.route("/email-verification").get().post(postEmailVerification);

export default userRouter;
