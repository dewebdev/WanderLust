// controllers/user.js
const User = require("../models/user");

// Render the signup form
module.exports.renderSignupForm = async (req, res) => {
  res.render("signup.ejs");
};

// Handle user signup
module.exports.addSignupUser = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const newUser = new User({email, username});
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
};

// Render the login form
module.exports.renderLoginForm = async (req, res) => {
  res.render("login.ejs");
};

// Handle user login
module.exports.loginUser = async (req, res) => {
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Handle user logout
module.exports.logoutUser = async (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now");
    res.redirect("/listings");
  });
};
