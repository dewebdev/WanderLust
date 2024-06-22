const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const cookieParser = require("cookie-parser");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use(cookieParser("if0rg0t!10"));

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.get("/", (req, res) => {
  res.cookie("username", "Dhanush", {signed: true});
  res.render("home.ejs");
});

app.get("/verify", (req, res, next) => {
  console.log(req.signedCookies);
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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
