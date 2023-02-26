const User = require("../models/user");

function getSignInPage(req, res) {
  return res.render("signin");
}

function getSignUpPage(req, res) {
  return res.render("signup");
}

async function getLogoutPage(req, res) {
  return res.clearCookie("token").redirect("/");
}

async function postSignIn(req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPassword(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log("Error Occured :", error);
    return res.render("signin", { error: "Invalid Email or Password !!" });
  }
}

async function postSignUp(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/user/signin");
}

module.exports = {
  getSignInPage,
  getSignUpPage,
  getLogoutPage,
  postSignIn,
  postSignUp,
};
