import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join");
};

export const postJoin = async (req, res) => {
  let {
    body: { username, password, email },
    body,
  } = req;
  //   console.log(body);
  //   const regexp = `^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$`;
  //   const test = new RegExp(
  //     `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$`,
  //     "ig"
  //   );
  //   console.log("password: ", password);
  //   console.log(test.test(password));
  const str = "table football";
  const regex = new RegExp("foo*");
  console.log(regex.test(str));

  //   try {
  //     await User.create({
  //       username,
  //       password,
  //       email,
  //     });
  return res.redirect("/");
  //   } catch (err) {
  //     return res.status(400).render("home", { err });
  //   }
};
