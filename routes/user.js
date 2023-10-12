const express = require("express");
const Routes = express.Router();

const path = require("path");

Routes.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
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

module.exports = Routes;
