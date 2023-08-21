const express = require("express");
const {
  createPost,
  getFeedposts,
  getUserPosts,
  likePost,
  filteredPost,
} = require("../controllers/post.controller");

const jwtVrification = require("../middleware/jwtAuth.js");

const router = express.Router();

router.post("/create", jwtVrification.jwtAuth, createPost);

router.get("/", jwtVrification.jwtAuth, getFeedposts);

router.get("/:userId/posts", jwtVrification.jwtAuth, getUserPosts);

router.patch("/:id/like", jwtVrification.jwtAuth, likePost);

router.get("/category", jwtVrification.jwtAuth, filteredPost);

module.exports = router;
