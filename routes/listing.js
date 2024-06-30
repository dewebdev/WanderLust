// routes/listings.js
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudinaryConfig.js");
const upload = multer({storage});

// Route to show all listings
router.get("/", wrapAsync(listingController.showAllListings));

// Routes to render the form to create a new listing and to create a new listing
router
  .route("/new")
  .get(isLoggedIn, wrapAsync(listingController.renderCreateListingForm))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// Routes to show, update, and delete a specific listing by ID
router
  .route("/:id")
  .get(wrapAsync(listingController.showListingById))
  .patch(isLoggedIn, isOwner, wrapAsync(listingController.updateListingById))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListingById));

// Route to render the form to edit a listing by ID
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditListingForm));

module.exports = router;
