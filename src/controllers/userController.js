"use strict";
import User from "../models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).render("login", {
      title: "Login",
      error: "유저명이 틀렸거나 존재하지 않습니다.",
    });
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.status(400).render("login", {
      title: "Login",
      error: "비밀번호가 틀렸습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.cookie.maxAge = 3600000;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.loggedIn = false;
  return res.redirect("/");
};

export const getUserEdit = (req, res) => {
  return res.render("profile", { title: "Profile" });
};

export const getEmailVerification = async (req, res) => {
  return res.render("emailVerification", {
    title: "Verify",
    verificationMessage: "계정이 인증되지 않았습니다.",
  });
};

export const postEmailVerification = async (req, res) => {
  const {
    session: {
      user: { username },
    },
    session,
  } = req;

  console.log(session);
  const userVerified = await User.findOne({ username });
  console.log(userVerified);

  let transporter = await nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    post: 587,
    secure: true,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_EMAIL,
    to: "win9592@gmail.com",
    subject: "계정인증!!!@@!!!",
    html: `<div style="text-align: center;">
    <h3 style="color: #FA5882">ABC</h3>
    <br />
    <p>123456</p>
    </div>`,
  });

  try {
    await User.findOneAndUpdate(
      { username },
      {
        emailVerification: true,
      }
    );
    return res.render("emailVerification", {
      title: "Verify",
      verificationMessage: "계정이 인증되었습니다!",
    });
  } catch (err) {
    return res
      .status(500)
      .render("emailVerification", {
        err,
        verificationMessage: "에러발생! 다시 시도해주세요!",
      });
  }
};
