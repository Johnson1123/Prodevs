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

const express = require("express");
const app = express();

const path = require("path");
const bodyPaser = require("body-parser");
const { mongoClient } = require("./utils/db");
const dot = require("dotenv");
const { MongoClient } = require("mongodb");
// app.use(dot.config());

app.set("view engine", "ejs");
// app.set("view", "views")

app.use(express.static(path.join(__dirname, "views")));

app.use(bodyPaser.urlencoded({ extended: true }));

const Routes = require("./routes/user");

app.use(Routes);

mongoClient(app.listen(3000));
