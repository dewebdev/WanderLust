const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const Review = require("../models/reviews");
const {isLoggedIn, validateReview} = require("../middleware");
const router = express.Router({mergeParams: true});

// Route to add a review to a specific listing
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id); // Find the listing by ID
    let newReview = new Review(req.body.review); // Create a new review

    listing.review.push(newReview); // Add the new review to the listing
    newReview.created_by = req.user._id;
    await newReview.save(); // Save the new review
    await listing.save(); // Save the updated listing
    req.flash("success", "Review Created ");
    res.redirect(`/listings/${listing._id}`); // Redirect to the listing's page
  })
);

// Route to delete a review from a specific listing
router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    let {id, reviewId} = req.params; // Get the listing ID and review ID from the request parameters

    let review = await Review.findById(reviewId); // Delete the review by ID

    if (!review.created_by.equals(res.locals.currentUser._id)) {
      req.flash("error", "You are not the owner of the review");
      return res.redirect(`/listings/${id}`);
    }
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}}); // Remove the review from the listing
    req.flash("success", "Review Deleted ");
    res.redirect(`/listings/${id}`); // Redirect to the listing's page
  })
);

module.exports = router;
