// const { myDb } = require("../utils/db");
// const mongodb = require("mongodb");

// const createUser = async (req, res) => {
//   const db = myDb();
//   const { name, email, password } = req.body;

//   try {
//     db.collection("users").insertOne({ name, email, password });
//     res.render("index", { name, email });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const findUsers = async (req, res) => {
//   const db = myDb();
//   try {
//     db.collection("users")
//       .find()
//       .toArray()
//       .then((users) => {
//         res.render("users", { users });
//         console.log(users);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   } catch (error) {
//     console.log(err);
//   }
// };

// const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const db = myDb();
//   db.collection("users")
//     .deleteOne({ _id: new mongodb.ObjectId(id) })
//     .then((user) => {
//       res.redirect("/home");
//     })
//     .catch((err) => console.log(err));
// };
// const updateUser = async (req, res) => {
//   const { name, id, email, password } = req.body;
//   const db = myDb();
//   db.collection("users")
//     .updateOne(
//       { _id: new mongodb.ObjectId(id) },
//       { $set: { name, email, password } }
//     )
//     .then((user) => {
//       res.redirect("/home");
//     })
//     .catch((err) => console.log(err));
// };

// // findOne({_id: new mongodb.ObjectId(prod.id)})
// // updateOne({ _id: new mongodb.ObjectId(prod.id) }, { $set: { name: "" } });

// exports.createUser = createUser;
// exports.findUsers = findUsers;
// exports.updateUser = updateUser;
// exports.deleteUser = deleteUser;

// const { myDb } = require("../utils/db");

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
  const { name, email, password, confirmPassword, phone } = req.body;
  try {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      phone === "" ||
      confirmPassword === ""
    ) {
      return res.status(400).json({
        status: "failed",
        message: "All filed must be filled",
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
      name,
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
  const { name, id, email, password } = req.body;
  try {
    await User.findByIdAndUpdate(id, { name, email, password }).then((user) => {
      res.redirect("/home");
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  // res.setHeader("Set-Cookie", "isLoggined=true");
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
    user,
    token,
  });
  // req.session.isLoggined = true;
  // req.session.user = user;
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

const updateProfile = async (req, res) => {
  const user = req.body;

  return res.status(200).json({
    status: "success",
    user,
    message: "You're authorized",
  });
};

// findOne({_id: new mongodb.ObjectId(prod.id)})
// updateOne({ _id: new mongodb.ObjectId(prod.id) }, { $set: { name: "" } });

// const AuthCreateUser = async (req, res) => {
//   const { email, name, password } = req.body;
//   const userEmail = await User.findOne({ email });
//   try {
//     if (userEmail) {
//       return res.send("Email Already Exist");
//     }
//     const hashedPass = await bcrypt.hash(password, 12);

//     if (hashedPass) {
//       const user = new User({
//         email,
//         name,
//         password: hashedPass,
//       });
//       user.save();
//       return res.status(200).json({
//         status: "Successful",
//         user,
//       });
//     }
//   } catch (error) {}
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userEmail = await User.findOne({ email });
//     if (!userEmail) {
//       return res.status(500).json({
//         status: false,
//         message: "Email not found",
//       });
//     }
//     const correctPass = await bcrypt.compare(password, userEmail.password);
//     res.session.isLoggedIn = true;
//     res.session.user = userEmail;
//     req.session.save();
//     return res;
//   } catch (error) {}
// };
exports.createUser = createUser;
exports.findUsers = findUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.googleAuth = googleAuth;
exports.updateProfile = updateProfile;
