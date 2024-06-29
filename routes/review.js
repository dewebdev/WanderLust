// routes/reviews.js
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, validateReview} = require("../middleware");
const router = express.Router({mergeParams: true});
const reviewController = require("../controllers/review");

// Route to add a new review
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.addReview)
);

// Route to delete a review by ID
router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
