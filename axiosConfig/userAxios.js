const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.USER_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

module.exports = axiosInstance;
