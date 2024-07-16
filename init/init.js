const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");
const localDbUrl = "mongodb://127.0.0.1:27017/wanderLust";
require("dotenv").config();

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  const uri = process.env.ATLAS_CLUSTER_CONNECTION_STRING;
  await mongoose.connect(uri);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "669629672b1d674fb7ddeccd",
  }));
  await Listing.insertMany(initData.data);
};

initDB();
