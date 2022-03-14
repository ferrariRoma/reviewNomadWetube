import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { title: "Home", videos });
  } catch (err) {
    res.render("home", { err });
  }
};

export const watchVideo = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = fakeVideos[id - 1];

  res.render("watch", {
    video,
    fakeVideos,
    title: "Video",
  });
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

export const getUpload = (req, res) => {
  return res.render("upload", { title: "Upload" });
};

export const postUpload = (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;
  console.log("title: ", title);
  console.log("description: ", description);
  console.log("hashtags: ", hashtags);
  return res.redirect("/");
};

export const searchVideo = (req, res) => {
  res.send("Search Video");
};
