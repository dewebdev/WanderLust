if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

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
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");
const wrapAsync = require("./utils/wrapAsync.js");

// Middleware setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieParser(process.env.SESSION_SECRET));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_CLUSTER_CONNECTION_STRING,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000000},
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages middleware
app.use(flash());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLAS_CLUSTER_CONNECTION_STRING);
}

// Set local variables for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", users);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new expressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Something went wrong"} = err;
  res.status(statusCode).render("errors.ejs", {err});
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
