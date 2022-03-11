const fakeVideos = [
  {
    title: "fuck",
    rating: 0,
    views: 1,
    id: 1,
  },
  {
    title: "you",
    rating: 2,
    views: 0,
    id: 2,
  },
  {
    title: "ha",
    rating: 4,
    views: 2,
    id: 3,
  },
];

export const home = (req, res) => {
  res.render("home", { title: "Home", fakeVideos });
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

export const uploadVideo = (req, res) => {
  res.send("Upload");
};

export const searchVideo = (req, res) => {
  res.send("Search Video");
};
