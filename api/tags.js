const express = require("express");
const tagsRouter = express.Router();
//console.log("express", express);
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

// middleware fires on GET request to /api/users
// sends back object, with empty array
tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();
  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const tagName = req.params.tagName;

  try {
    // use our method to get posts by tag name from the db
    const postList = await getPostsByTagName(tagName);
    const posts = postList.filter((post) => {
      return post.active || (req.user && post.author.id === req.user.id);
    });
    res.send({ posts });
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message });
  }
});

module.exports = tagsRouter;
