const express = require("express");
const router = express.Router();
const {
  getSignInPage,
  getSignUpPage,
  getLogoutPage,
  postSignIn,
  postSignUp,
} = require("../controllers/user");

router.get("/signin", getSignInPage);

router.get("/signup", getSignUpPage);

router.post("/signin", postSignIn);

router.post("/signup", postSignUp);

router.get("/logout", getLogoutPage);

module.exports = router;
