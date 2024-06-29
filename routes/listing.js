const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const router = express.Router();
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

// Route to get all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({}); // Find all listings
    res.render("listings.ejs", {allListings}); // Render the listings page with the found listings
  })
);

// Route to render the form to create a new listing
router.get(
  "/new",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    res.render("createList.ejs"); // Render the form to create a new listing
  })
);

// Route to create a new listing
router.post(
  "/new",
  validateListing,
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const list = new Listing(req.body.listing); // Create a new listing with the provided data
    list.owner = req.user._id;
    await list.save(); // Save the new listing to the database
    req.flash("success", "Listing Created");
    res.redirect("/listings"); // Redirect to the listings page
  })
);

// Route to get a specific listing by ID
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listDetail = await Listing.findById(id)
      .populate({
        path: "review",
        populate: {
          path: "created_by",
        },
      })
      .populate("owner"); // Find the listing by ID and populate the reviews

    if (!listDetail) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("showList.ejs", {listDetail}); // Render the listing details page with the found listing
  })
);

// Route to render the form to edit a specific listing by ID
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listDetail = await Listing.findById(id); // Find the listing by ID
    if (!listDetail) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("editList.ejs", {listDetail}); // Render the edit form with the found listing
  })
);

// Route to update a specific listing by ID
router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing updated "); // Update the listing with the provided data
    res.redirect("/listings"); // Redirect to the listings page
  })
);

// Route to delete a specific listing by ID
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id); // Delete the listing by ID
    req.flash("success", "Listing Deleted ");
    res.redirect("/listings"); // Redirect to the listings page
  })
);

module.exports = router;
