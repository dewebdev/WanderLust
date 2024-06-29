// controllers/review.js
const Review = require("../models/reviews");
const Listing = require("../models/listing");

// Add a new review to a listing
module.exports.addReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id); // Find the listing by ID
  const newReview = new Review(req.body.review); // Create a new review

  newReview.created_by = req.user._id;
  listing.review.push(newReview); // Add the new review to the listing

  await newReview.save(); // Save the new review
  await listing.save(); // Save the updated listing

  req.flash("success", "Review Created");
  res.redirect(`/listings/${listing._id}`); // Redirect to the listing's page
};

// Delete a review by ID
module.exports.deleteReview = async (req, res, next) => {
  const {id, reviewId} = req.params; // Get the listing ID and review ID from the request parameters
  const review = await Review.findById(reviewId); // Find the review by ID

  if (!review.created_by.equals(req.user._id)) {
    req.flash("error", "You are not the owner of the review");
    return res.redirect(`/listings/${id}`);
  }

  await Review.findByIdAndDelete(reviewId); // Delete the review by ID
  await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}}); // Remove the review from the listing

  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`); // Redirect to the listing's page
};
