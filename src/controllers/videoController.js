import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { title: "Home", videos });
};

export const watchVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (video === null) {
    res.status(404).render("404", { title: "Video Not Found", err });
  }
  const otherVideo = await Video.find({});
  res.render("watch", { title: "Watch", video, otherVideo });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (video === null) {
    return res.status(404).render("404", { err });
  }
  res.render("edit", { title: "Edit Video", video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { title: "Video Not Found", err });
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
  } = req;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (err) {
    return res.status(400).render("upload", { title: "Upload", err });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { title: "Video Not Found", err });
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const searchVideo = (req, res) => {
  res.send("Search Video");
};
