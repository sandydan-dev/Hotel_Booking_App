const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionDB = async () => { 
  await mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB:", err);
      process.exit(1);
    });
};

module.exports = connectionDB;