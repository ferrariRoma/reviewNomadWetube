"use strict";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import User from "../models/User";
import bcrypt from "bcrypt";
import { token } from "morgan";

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
    body: { email, password },
  } = req;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).render("login", {
      title: "Login",
      error: "이메일이 틀렸거나 존재하지 않습니다.",
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
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getUserEdit = (req, res) => {
  return res.render("profile", { title: "Profile" });
};

export const getEmailVerification = async (req, res) => {
  const {
    session: {
      user: { _id, email },
    },
    session: { user },
  } = req;
  let transporter = nodemailer.createTransport({
    server: "naver",
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const option = {
    from: process.env.MAIL_EMAIL,
    to: email,
    subject: "Hello?",
    html: `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verification</title>
        <style>
          body {
            box-sizing: border-box;
            text-align: center;
            display: flex;
            justify-content: center;
            background-color: #90bfe3;
          }
          main {
            background-color: rgba(255, 255, 255, 0.5);
            width: 700px;
            height: 370px;
          }
          button {
            background-color: #074f7f;
            width: 100px;
            height: 70px;
            border-radius: 25%;
            cursor: pointer;
            color: rgb(255, 247, 156);
            font-size: large;
            border: none;
          }
          button:hover {
            animation: buttonFocus 0.7s ease-in-out forwards;
          }
          @keyframes buttonFocus {
            from {
              background-color: #074f7f;
            }
            to {
              background-color: #298fd3;
            }
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Email인증 메일입니다. 아래 URL을 눌러주세요!</h1>
          <a>http://localhost:4000/users/email-verification/${_id}</a>
        </main>
      </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(option);
    return res.rediect("/", {
      title: "Verify",
      verificationMessage: "인증메일을 보냈습니다!",
    });
  } catch (err) {
    return res.render("emailVerification", {
      title: "Verify",
      err,
    });
  }
};

export const postEmailVerification = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  try {
    await User.findByIdAndUpdate(_id, {
      emailVerification: true,
    });
    return res.redirect("/");
  } catch (err) {
    return res.render("emailVerification", {
      title: "Verify",
      err,
    });
  }
};

export const startNaverLogin = (req, res) => {
  const baseUrl = "https://nid.naver.com/oauth2.0/authorize";
  const callbackUrl = "http://localhost:4000/users/naver/finish";
  const state = "ihdo4ih580bf1y7o849w6a31";
  const config = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: callbackUrl,
    response_type: "code",
    state,
  };
  const params = new URLSearchParams(config);
  const result = `${baseUrl}?${params}`;
  return res.redirect(result);
};

export const finishNaverLogin = async (req, res) => {
  const {
    query: { error_description, state, code },
  } = req;
  if (error_description) {
    console.log(error_description);
    return res
      .status(401)
      .render("login", { title: "Login", error: error_description });
  }

  const baseUrl = "https://nid.naver.com/oauth2.0/token";
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    state,
  };
  const params = new URLSearchParams(config);
  const result = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(result, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://openapi.naver.com/v1/nid/me";

    const userData = await (
      await fetch(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    const {
      response: { email, nickname },
    } = userData;

    const user = await User.findOne({ email });
    if (!user) {
      const user = User.create({
        username: nickname,
        password: "",
        email,
        emailVerification: true,
        socialUser: true,
      });
    }
    req.session.user = user;
    req.session.loggedIn = true;
    console.log("여기");
    return res.redirect("/");
  } else {
    return res.status(404).redirect("/login");
  }
};
