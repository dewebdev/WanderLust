const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Please enter the description by editing the page",
  },
  image: {
    type: Object,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (deletedList) => {
  await Review.deleteMany({_id: {$in: deletedList.review}});
  console.log("reviews deleted successfully upon list deleted");
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
