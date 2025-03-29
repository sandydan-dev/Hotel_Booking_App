const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const URI = process.env.MONGO_URI_DEV;
const connectionDB = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB : ", process.env.NODE_ENV);
    })
    .catch((err) => {
      console.log("Error connecting to DB:", err);
      process.exit(1);
    });
};

module.exports = connectionDB;
