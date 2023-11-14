// Day Two

// const app = require("express")();
// // const path = require("path");

// app.use("/home", (req, res, next) => {
//   // res.send({ name: "johnson", age: 20, color: "red" });
//   res.sendFile(__dirname + "/index.html");
// });
// app.use("")
// app.listen(3000, () => {
//   console.log("Server running successful");
// });

// ------------ Day 3 -------------------

// const express = require("express");
// const app = express();

// const path = require("path");
// const bodyPaser = require("body-parser");

// app.use(bodyPaser.urlencoded({ extended: true }));

// // app.use("/product", (req, res, next) => {
// //   // res.send({ name: "johnson", age: 20, color: "red" });
// //   req.body = {};
// //   next();
// // });

// // app.use("/", (req, res) => {
// //   // res.sendFile(__dirname + "/index.html");
// //   res.send(req.body);
// // });

// app.use("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "register.html"));
// });

// app.use("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "login.html"));
// });

// app.use("/app/register", (req, res) => {
//   res.redirect("/login");
// });
// app.use("/home", (req, res) => {
//   res.send(req.body);
// });

// app.listen(3000, () => {
//   console.log("Server running successful");
// });

// ------------------ Day 4 ---------------------

// const express = require("express");
// const app = express();

// const path = require("path");
// const bodyPaser = require("body-parser");

// app.use(express.static(path.join(__dirname, "views")));

// app.use(bodyPaser.urlencoded({ extended: true }));

// const Routes = require("./routes/user");

// // app.use("/product", (req, res, next) => {
// //   // res.send({ name: "johnson", age: 20, color: "red" });
// //   req.body = {};
// //   next();
// // });

// // app.use("/", (req, res) => {
// //   // res.sendFile(__dirname + "/index.html");
// //   res.send(req.body);
// // });

// app.use(Routes);

// app.listen(3000, () => {
//   console.log("Server running successful");
// });

// -------------------- Day 6 ------------------

// const express = require("express");
// const app = express();

// const path = require("path");
// const bodyPaser = require("body-parser");
// const { mongoClient } = require("./utils/db");
// const dot = require("dotenv");
// const { MongoClient } = require("mongodb");
// app.use(express.static(__dirname + "/public"));
// app.set("view engine", "ejs");
// // app.set("view", "views")

// app.use(bodyPaser.urlencoded({ extended: true }));

// const Routes = require("./routes/user");
// const { default: mongoose } = require("mongoose");

// app.use(Routes);

// mongoClient(app.listen(3000));

// mongoose
//   .connect(
//     "mongodb+srv://dammy:Dammy1123@dammy.5lgvdve.mongodb.net/shop?retryWrites=true&w=majority"
//   )
//   .then((connect) => {
//     app.listen(3000);
//     console.log("is connected");
//   })
//   .catch((err) => console.log(err));

// --------------- Day 8 --------------------
// const express = require("express");
// const app = express();

// const path = require("path");
// const bodyPaser = require("body-parser");
// const { mongoClient } = require("./utils/db");
// const dot = require("dotenv");
// const { MongoClient } = require("mongodb");
// app.use(express.static(__dirname + "/public"));
// app.set("view engine", "ejs");
// // app.set("view", "views")

// app.use(bodyPaser.urlencoded({ extended: true }));

// const Routes = require("./routes/user");
// const { default: mongoose } = require("mongoose");

// app.use(Routes);

// mongoClient(app.listen(3000));

// ------------------ 9 ----------------------

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");
const bodyPaser = require("body-parser");
const { mongoClient } = require("./utils/db");
require("dotenv").config();
const { MongoClient } = require("mongodb");
// const session = require("express-session");
// const sessionDB = require("connect-mongodb-session")(session);

// app.set("view", "views")
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyPaser.urlencoded({ extended: true }));

const Routes = require("./routes/user");
const db = require("./utils/db");
const { User } = require("./model/user");

app.use(Routes);

db(app.listen(3000));
