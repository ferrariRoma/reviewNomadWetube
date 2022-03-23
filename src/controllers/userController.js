import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join");
};

export const postJoin = async (req, res) => {
  let {
    body: { username, password, email },
    body,
  } = req;
  const regExp = new RegExp(
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`,
    "i"
  );
  if (regExp.test(password)) {
    const pwError = "반드시 대・소문자, 숫자, 특수문자를 모두 사용!";
    return res.render("join", { pwError });
  }

  try {
    await User.create({
      username,
      password,
      email,
    });
    return res.redirect("/");
  } catch (err) {
    return res.status(400).render("home", { err });
  }
};
