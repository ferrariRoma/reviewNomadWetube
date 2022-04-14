"use strict";
import multer from "multer";

// locals Middleware
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

// protect router Middleware
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.status(403).redirect("/");
  }
};

export const loggedOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.status(403).redirect("/");
  }
};

export const emailVerifiMiddleware = (req, res, next) => {
  if (req.session.user.emailVerification) {
    return next();
  } else {
    return res.status(403).redirect("/");
  }
};

export const emailNotVerifiMiddleware = (req, res, next) => {
  if (!req.session.user.emailVerification) {
    return next();
  } else {
    return res.status(403).redirect("/");
  }
};

// multerMiddleware for uploading
export const avatarUploadMiddleware = multer({
  dest: "uploads/avatars/",
  limits: { fieldSize: 5000000 },
});

export const videoUploadMiddleware = multer({
  dest: "uploads/videos",
  limits: { fieldSize: 5000000 },
});
