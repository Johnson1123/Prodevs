const express = require("express");
const { myDb } = require("../utils/db");
const mongodb = require("mongodb");
const Routes = express.Router();
const isLogin = require("../middleware/isAuth");

const path = require("path");
const { error } = require("console");
const {
  createUser,
  findUsers,
  updateUser,
  deleteUser,
  loginUser,
  googleAuth,
  updateProfile,
  getUser,
} = require("../controller/user");
const { User } = require("../model/user");
const { upload } = require("../middleware/muter");

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

// Routes.post("/app/update", updateUser);
Routes.get("/app/delete/:id", deleteUser);

Routes.post("/app/login", loginUser);
Routes.post("/app/register", createUser);
Routes.get("/app/users", findUsers);
Routes.get("/app/get-user", getUser);
Routes.post("/app/update-user", updateUser);
Routes.post("/app/google", googleAuth);
Routes.get("/update/profile", isLogin, updateProfile);
Routes.get("/database/users", (req, res) => {});
module.exports = Routes;
