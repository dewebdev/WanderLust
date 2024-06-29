const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {saveRedirectUrl} = require("../middleware.js");
const passport = require("passport");
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      const {username, email, password} = req.body;
      const newUser = new User({
        email,
        username,
      });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "User signup successful :)");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome to WanderLust",
  }),
  async (req, res) => {
    res.redirect(res.locals.redirectUrl ? res.locals.redirectUrl : "/listings");
  }
);

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are logged out now");
    res.redirect("/listings");
  });
});

module.exports = router;
