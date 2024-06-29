// controllers/listing.js
const Listing = require("../models/listing");

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
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  console.log(newListing);
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

  res.render("editList.ejs", {listing});
};

// Update a specific listing by ID
module.exports.updateListingById = async (req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
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
