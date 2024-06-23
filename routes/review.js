const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const expressError = require("../utils/expressError");
const {reviewSchema} = require("../schema");
const Review = require("../models/reviews");
const router = express.Router({mergeParams: true});

// Middleware to validate the review data
const validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(400, errMsg);
  } else {
    next();
  }
};

// Route to add a review to a specific listing
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id); // Find the listing by ID
    let newReview = new Review(req.body.review); // Create a new review

    listing.review.push(newReview); // Add the new review to the listing

    await newReview.save(); // Save the new review
    await listing.save(); // Save the updated listing
    req.flash("success", "Review Created ");
    res.redirect(`/listings/${listing._id}`); // Redirect to the listing's page
  })
);

// Route to delete a review from a specific listing
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res, next) => {
    let {id, reviewId} = req.params; // Get the listing ID and review ID from the request parameters

    let review = await Review.findByIdAndDelete(reviewId); // Delete the review by ID
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}}); // Remove the review from the listing
    req.flash("success", "Review Deleted ");
    res.redirect(`/listings/${id}`); // Redirect to the listing's page
  })
);

module.exports = router;
