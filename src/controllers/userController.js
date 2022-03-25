import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { title: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { username, password, password2, email },
  } = req;

  // username, email중복여부 체크
  const existsUsername = await User.exists({ username });
  if (existsUsername) {
    return res.status(400).render("join", {
      title: "Join",
      error: "유저명이 이미 존재합니다!",
    });
  }
  const existsEmail = await User.exists({ email });
  if (existsEmail) {
    return res.status(400).render("join", {
      title: "Join",
      error: "이메일이 이미 존재합니다!",
    });
  }

  // 비밀번호 특수문자 확인
  const regExp = new RegExp(
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`,
    "i"
  );
  if (!regExp.test(password)) {
    return res.status(400).render("join", {
      title: "Join",
      error: "반드시 대・소문자, 숫자, 특수문자를 모두 사용!",
    });
  }
  // 비밀번호가 확인과 다를 시
  if (password !== password2) {
    return res
      .status(400)
      .render("join", { title: "Join", error: "비밀번호가 다릅니다!" });
  }

  try {
    await User.create({
      username,
      password,
      email,
    });
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).render("join", { title: "Join", err });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { title: "Login" });
};

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const exists = await User.findOne({ username });

  if (!exists) {
    return res.status(400).render("login", {
      title: "Login",
      error: "유저명이 틀렸거나 존재하지 않습니다.",
    });
  }
  const passwordOk = await bcrypt.compare(password, exists.password);
  if (!passwordOk) {
    return res.status(400).render("login", {
      title: "Login",
      error: "비밀번호가 틀렸습니다.",
    });
  }

  return res.redirect("/");
};
