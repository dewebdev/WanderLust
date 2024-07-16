// controllers/listing.js
const Listing = require("../models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

// Show all listings
module.exports.showAllListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings.ejs", {allListings});
};

// Render the form to create a new listing
module.exports.renderCreateListingForm = async (req, res) => {
  res.render("createList.ejs");
};

// Create a new listing
module.exports.createListing = async (req, res, next) => {
  let location = req.body.listing.location;
  let response = await geocodingClient
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();

  let locationCordinates = response.body.features[0].geometry;

  const newListing = new Listing(req.body.listing);
  newListing.geometry = locationCordinates;
  newListing.owner = req.user._id;
  const url = req.file.path;
  const filename = req.file.filename;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success", "Listing Created");
  res.redirect("/listings");
};

// Show a specific listing by ID
module.exports.showListingById = async (req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "created_by",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("showList.ejs", {listing});
};

// Render the form to edit a listing by ID
module.exports.renderEditListingForm = async (req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  let reducedPreviewImage = listing.image.url.replace(
    "/upload",
    "/upload/q_auto:low"
  );

  res.render("editList.ejs", {listing, reducedPreviewImage});
};

// Update a specific listing by ID
module.exports.updateListingById = async (req, res) => {
  const {id} = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect("/listings");
};

// Delete a specific listing by ID
module.exports.deleteListingById = async (req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
