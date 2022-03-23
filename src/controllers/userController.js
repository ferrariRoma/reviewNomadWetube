import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join");
};

export const postJoin = async (req, res) => {
  let {
    body: { username, password, email },
  } = req;

  // 비밀번호 특수문자 확인
  const regExp = new RegExp(
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`,
    "i"
  );
  if (!regExp.test(password)) {
    const errorMsg = "반드시 대・소문자, 숫자, 특수문자를 모두 사용!";
    return res.status(400).render("join", { errorMsg });
  }

  // username, email중복여부 체크
  const existsUsername = await User.exists({ username });
  if (existsUsername) {
    const errorMsg = "유저명이 이미 존재합니다!";
    return res.status(400).render("join", { errorMsg });
  }
  const existsEmail = await User.exists({ email });
  if (existsEmail) {
    const errorMsg = "이메일이 이미 존재합니다!";
    return res.status(400).render("join", { errorMsg });
  }

  try {
    await User.create({
      username,
      password,
      email,
    });
    return res.redirect("/");
  } catch (err) {
    return res.status(400).render("join", { err });
  }
};
