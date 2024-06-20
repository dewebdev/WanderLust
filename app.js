const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAysnc = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const {listingSchema} = require("./schema.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get(
  "/listings",
  wrapAysnc(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings.ejs", {allListings});
  })
);

app.get("/listings/new", (req, res) => {
  res.render("createList.ejs");
});

app.post(
  "/listings/new",
  wrapAysnc(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    if (result.error) {
      throw new expressError(400, result.error);
    }
    const list = new Listing(req.body.listing);
    await list.save();
    res.redirect("/listings");
  })
);

app.get(
  "/listings/:id",
  wrapAysnc(async (req, res) => {
    let {id} = req.params;
    let listDetail = await Listing.findById(id);
    res.render("showList.ejs", {listDetail});
  })
);

app.get(
  "/listings/:id/edit",
  wrapAysnc(async (req, res) => {
    let {id} = req.params;
    let listDetail = await Listing.findById(id);
    res.render("editList.ejs", {listDetail});
  })
);

app.patch(
  "/listings/:id",
  wrapAysnc(async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect("/listings");
  })
);

app.delete(
  "/listings/:id",
  wrapAysnc(async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
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
