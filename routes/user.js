const express = require("express");
const db = require("../utils/db");
const Routes = express.Router();

const path = require("path");

Routes.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "register.html"));
});

Routes.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

Routes.use("/app/register", (req, res) => {
  res.redirect("/login");
});
Routes.post("/home", (req, res) => {
  res.send(req.body);
});

Routes.get("/database/users", (req, res) => {
  db.execute("select * from users")
    .then((data) => console.log(data))
    // .then((res) => console.log(res))
    .catch((error) => console.log(error));
});
module.exports = Routes;
