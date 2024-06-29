// routes/users.js
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl} = require("../middleware");
const passport = require("passport");
const userController = require("../controllers/user");

// Routes to render the signup form and handle user signup
router
  .route("/signup")
  .get(wrapAsync(userController.renderSignupForm)) // Render the signup form
  .post(wrapAsync(userController.addSignupUser)); // Handle user signup

// Routes to render the login form and handle user login
router
  .route("/login")
  .get(wrapAsync(userController.renderLoginForm)) // Render the login form
  .post(
    saveRedirectUrl, // Middleware to save the URL the user was trying to access
    passport.authenticate("local", {
      failureRedirect: "/login", // Redirect to login on failure
      failureFlash: true, // Enable flash messages on failure
      successFlash: "Welcome to WanderLust", // Flash message on success
    }),
    wrapAsync(userController.loginUser) // Handle user login
  );

// Route to handle user logout
router.get("/logout", wrapAsync(userController.logoutUser));

module.exports = router;
