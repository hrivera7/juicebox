const express = require("express");
const postsRouter = express.Router();
//console.log("express", express);
const { getAllPosts } = require("../db");

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

// middleware fires on GET request to /api/posts
// sends back object, with empty array
postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.send({
    posts,
  });
});

module.exports = postsRouter;
