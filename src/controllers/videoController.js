"use strict";
import { param } from "express/lib/request";
import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { title: "Home", videos });
};

export const watchVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    res.status(404).render("404", { title: "Video Not Found", err });
  }
  const otherVideo = await Video.find({});
  res.render("watch", { title: "Watch", video, otherVideo });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    locals: {
      loggedInUser: { _id },
    },
  } = res;
  const video = await Video.findById(id);
  if (!(video.owner.toString() === _id.toString())) {
    const videos = await Video.find({});
    return res.status(401).render("home", {
      title: "Home",
      err: { message: "접근할 수 없습니다." },
      videos,
    });
  }
  if (!video) {
    return res.status(404).render("404", { title: "Edit Video", err });
  }
  res.render("edit", { title: "Edit Video", video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { title: "Not Found", err });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = async (req, res) => {
  return res.render("upload", { title: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    file,
  } = req;
  const {
    locals: { loggedInUser },
  } = res;
  try {
    const createdVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      videosUrl: file.path,
      owner: loggedInUser._id,
    });
    const uploader = await User.findById({ _id: loggedInUser._id });
    uploader.userVideo.push(createdVideo._id);
    uploader.save();
    return res.redirect("/");
  } catch (err) {
    return res.status(400).render("upload", { title: "Upload", err });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    session: { user },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { title: "Not Found", err });
  }
  try {
    const userInfo = await User.findById(user._id);
    await Video.findByIdAndDelete(id);
    userInfo.userVideo.splice(userInfo.userVideo.indexOf(id), 1);
    await userInfo.save();
    req.session.user = userInfo;
    res.locals.loggedInUser = req.session.user;
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("home", { title: "home", err });
  }
};

export const searchVideo = async (req, res) => {
  const {
    query: { search },
  } = req;
  const regex = `(.+)?(${search})(.+)?`;

  let videos = await Video.find({
    title: { $regex: new RegExp(`${regex}`, "i") },
  });
  videos = videos.sort((a, b) => {
    const titleA = a.title;
    const titleB = b.title;
    if (titleA > titleB) return 1;
    if (titleA === titleB) return 0;
    if (titleA < titleB) return -1;
  });

  let tags = await Video.find({
    hashtags: { $regex: new RegExp(`${regex}`, "i") },
  });

  return res.render("search", { title: "Search Video", videos, tags });
};
