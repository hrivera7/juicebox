const express = require("express");
const tagsRouter = express.Router();
//console.log("express", express);
const { getAllTags } = require("../db");

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

module.exports = tagsRouter;
