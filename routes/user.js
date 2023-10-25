const express = require("express");
const { myDb } = require("../utils/db");
const mongodb = require("mongodb");
const Routes = express.Router();

const path = require("path");
const { error } = require("console");
const {
  createUser,
  // findUsers,
  // updateUser,
  // deleteUser,
} = require("../controller/user");

Routes.get("/register", (req, res) => {
  res.render("register");
});

// Routes.get("/app/update/:id", (req, res) => {
//   const { id } = req.params;
// });

// Routes.post("/app/update", updateUser);
// Routes.get("/app/delete/:id", deleteUser);

Routes.get("/login", (req, res) => {
  res.render("login");
});

Routes.use("/app/register", createUser);

// Routes.get("/home", findUsers);

// Routes.get("/database/users", (req, res) => {});
module.exports = Routes;
