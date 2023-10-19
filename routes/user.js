const express = require("express");
const { myDb } = require("../utils/db");
const Routes = express.Router();

const path = require("path");
const { error } = require("console");
const { createUser, findUsers } = require("../controller/user");

Routes.get("/register", (req, res) => {
  res.render("register");
});

Routes.get("/login", (req, res) => {
  res.render("login");
});

Routes.use("/app/register", createUser);

Routes.get("/home", findUsers);

Routes.get("/database/users", (req, res) => {
  db.execute("select * from users")
    .then((data) => console.log(data))
    // .then((res) => console.log(res))
    .catch((error) => console.log(error));
});
module.exports = Routes;
