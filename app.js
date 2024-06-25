const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const wrapAsync = require("./utils/wrapAsync.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use(cookieParser("if0rg0t!10"));
app.use(
  session({
    secret: "if0rg0t!10",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000000},
  })
);

app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      const {username, email, password} = req.body;
      const newUser = new User({
        email,
        username,
      });
      await User.register(newUser, password);
      req.flash("success", "User signup successful :)");
      res.redirect("/login");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successRedirect: "/listings",
    successFlash: "Welcome to WanderLust",
  })
);

app.all("*", (req, res, next) => {
  next(new expressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Something Went wrong"} = err;
  res.status(statusCode).render("errors.ejs", {err});
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT : ${PORT}`);
});
