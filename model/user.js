const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    max: [50, "Name too long"],
    min: [2, "Name too short"],
    required: [true, "name is required"],
  },
  email: {
    type: String,
    min: [5, "Email too short"],
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    min: [3, "Password too short"],
    required: [true, "password is required"],
  },
  file: {
    type: String,
  },
  phone: {
    type: String,
    max: [11, "number Most be 11"],
    min: [11, "Number Most be 11"],
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
