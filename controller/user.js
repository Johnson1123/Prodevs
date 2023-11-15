// ------------------ 9 ----------
const mongodb = require("mongodb");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const { handleUpload } = require("../utils/handleUpload");
const { signToken } = require("../utils/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  console.log(req.body);
  const { fname, lname, phone, email, password, confirmPassword } = req.body;
  try {
    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      password === "" ||
      phone === "" ||
      confirmPassword === ""
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All field must be filled",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "password must be match",
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: "fail",
        message: "User already exist",
      });
    }
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // const cldRes = await handleUpload(dataURI);

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: fname + " " + lname,
      email,
      password: hashPassword,
      // avater: cldRes.url,
      phone,
    });
    const token = signToken({ ...user });
    return res.status(201).json({
      status: "susscess",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const findUsers = async (req, res) => {
  // console.log(req.cookie);
  console.log(req.session.isLoggined);
  try {
    await User.find().then((users) => {
      res.render("users", { users });
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
};
const updateUser = async (req, res) => {
  const { fname, lname, email, phone, id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, {
      name: fname + " " + lname,
      email,
      phone,
    });
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "user cannot be found",
      });
    }
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User not exist",
    });
  }

  const correctPass = await bcrypt.compare(password, user.password);

  if (!correctPass) {
    return res.status(400).json({
      status: "fail",
      message: "Incorrect Credential",
    });
  }

  const token = await signToken({ ...user });

  return res.status(200).json({
    status: "success",
    data: user,
    token,
  });
  // req.session.isLoggined = true;
  // req.session.user = user;
};

const getUser = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "UnAuthorize page, please login",
    });
  }
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifyToken) {
    return res.status(401).json({
      status: "fail",
      message: "UnAuthorize page, Invalid token",
    });
  }
  return res.status(200).json({
    status: "success",
    data: verifyToken,
  });
};
const googleAuth = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  const user = await User.create({ name, email, picture });
  res.status(201).json({
    status: "Success",
    user,
  });
};

const changePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const email = req.user;

    const userExist = await User.findOne({ email }).select("+password");

    const samePass = await bcrypt.compare(password, userExist.password);

    if (!samePass) {
      res.status(400).json({
        status: "fail",
        message: " incorrect password",
      });
    }

    if (newPassword !== confirmNewPassword) {
      res.status(400).json({
        status: "fail",
        message: "password not match",
      });
    }
    const newHash = await bcrypt.hash(password, 10);

    userExist.password = newHash;

    const saveUser = await userExist.save();
    if (saveUser) {
      return res.status(201).json({
        status: "success",
        message: "password changed seccuessfuly",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.createUser = createUser;
exports.findUsers = findUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.googleAuth = googleAuth;
exports.getUser = getUser;
exports.changePassword = changePassword;
