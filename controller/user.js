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

const createUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, confirmPassword, phone, avater } = req.body;
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

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      avater,
      phone,
    });
    res.status(201).json({
      status: "susscess",
      data: user,
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

const loginUser = (req, res) => {
  // res.setHeader("Set-Cookie", "isLoggined=true");
  const { email, password } = req.body.email;
  const user = User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User not exist",
    });
  }

  // req.session.isLoggined = true;
  // req.session.user = user;
  res.redirect("/home");
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
