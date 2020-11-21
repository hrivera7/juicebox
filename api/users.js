const express = require("express");
const usersRouter = express.Router();
//console.log("express", express);
const { getAllUsers } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

// middleware fires on GET request to /api/users
// sends back object, with empty array
usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
});

module.exports = usersRouter;
