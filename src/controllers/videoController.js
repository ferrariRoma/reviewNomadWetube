import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { title: "Home", videos });
  } catch (err) {
    res.status(404).render("home", { err });
  }
};

export const watchVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    const otherVideo = await Video.find({});
    console.log("videos: ", video);
    res.status(200).render("watch", { title: "Watch", video, otherVideo });
  } catch (err) {
    res.status(404).render("watch", { title: "Watch", err });
  }
};

export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = fakeVideos[id - 1];
  res.render("edit", { title: "Edit Video", video });
};

export const postEdit = (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const video = fakeVideos[id - 1];
  video.views = body.views;
  res.redirect(`/videos/${id}`);
};

export const getUpload = async (req, res) => {
  return res.render("upload", { title: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;
  const modifyHashs = hashtags.split(",").map((hash) => `#${hash}`);
  try {
    const newVideo = await Video.create({
      title,
      description,
      modifyHashs,
    });
  } catch (err) {
    return res.status(400).render("upload", { title: "Upload", err });
  }
  return res.redirect("/");
};

export const searchVideo = (req, res) => {
  res.send("Search Video");
};
