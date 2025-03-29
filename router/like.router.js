const express = require("express");
const router = express.Router();

const verifyToken = require("../middelware/jwt.middelware");

const { createLike, getLikedData } = require("../controller/like.controller");

router.post("/like_create", verifyToken, createLike);

router.get("/liked_list", getLikedData);

module.exports = router;
