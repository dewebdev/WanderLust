const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "667fe89ecef7704daf025e16",
  }));
  await Listing.insertMany(initData.data);
  console.log("Dummy data inserted Successfully");
};

initDB();
