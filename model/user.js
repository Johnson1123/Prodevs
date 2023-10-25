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
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    min: [3, "Password too short"],
    required: [true, "Email is required"],
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
