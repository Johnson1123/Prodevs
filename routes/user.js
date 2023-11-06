const express = require("express");
const { myDb } = require("../utils/db");
const mongodb = require("mongodb");
const Routes = express.Router();

const path = require("path");
const { error } = require("console");
const {
  createUser,
  findUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/user");
const { User } = require("../model/user");

Routes.get("/register", (req, res) => {
  res.render("register");
});

Routes.get("/app/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findById({ _id: id }).then((user) => {
      res.render("update", { user });
    });
  } catch (error) {
    console.log(error);
  }
});

Routes.post("/app/update", updateUser);
Routes.get("/app/delete/:id", deleteUser);

Routes.get("/login", (req, res) => {
  res.render("login");
});
Routes.post("/login", loginUser);

Routes.post("/app/register", createUser);

Routes.get("/home", findUsers);

Routes.get("/database/users", (req, res) => {});
module.exports = Routes;
