// ---------------- mysql connection -------------

// const mysql2 = require("mysql2");
// let connect = mysql2.createPool({
//   host: "localhost",
//   user: "root",
//   database: "proDev",
//   password: "",
// });

// module.exports = connect.promise();

// ------------------- MongoDB connection --------------
// const { MongoClient } = require("mongodb");

// let db;

// const mongoClient = (callback) => {
//   new MongoClient(
//     "mongodb+srv://dammy:Dammy1123@dammy.5lgvdve.mongodb.net/shop?retryWrites=true&w=majority"
//   )
//     .connect()
//     .then((client) => {
//       console.log("connected");
//       db = client.db();
//       callback;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// const myDb = () => {
//   if (db) {
//     return db;
//   }
//   throw "Not conneted";
// };

// exports.myDb = myDb;
// exports.mongoClient = mongoClient;

// const { MongoClient } = require("mongodb");

// const mongoClient = new MongoClient(
//   "mongodb+srv://dammy:Dammy1123@prodev.wlecgxa.mongodb.net/?retryWrites=true&w=majority"
// )
//   .connect()
//   .then((client) => {
//     console.log("connected");
//     console.log(client);
//     app
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// module.exports = mongoClient;
