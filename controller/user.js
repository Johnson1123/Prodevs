const { myDb } = require("../utils/db");
const mongodb = require("mongodb");

const createUser = async (req, res) => {
  const db = myDb();
  const { name, email, password } = req.body;

  try {
    db.collection("users").insertOne({ name, email, password });
    res.render("index", { name, email });
  } catch (error) {
    console.log(error.message);
  }
};

const findUsers = async (req, res) => {
  const db = myDb();
  try {
    db.collection("users")
      .find()
      .toArray()
      .then((users) => {
        res.render("users", { users });
        console.log(users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const db = myDb();
  db.collection("users")
    .deleteOne({ _id: new mongodb.ObjectId(id) })
    .then((user) => {
      res.redirect("/home");
    })
    .catch((err) => console.log(err));
};
const updateUser = async (req, res) => {
  const { name, id, email, password } = req.body;
  const db = myDb();
  db.collection("users")
    .updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: { name, email, password } }
    )
    .then((user) => {
      res.redirect("/home");
    })
    .catch((err) => console.log(err));
};

// findOne({_id: new mongodb.ObjectId(prod.id)})
// updateOne({ _id: new mongodb.ObjectId(prod.id) }, { $set: { name: "" } });

exports.createUser = createUser;
exports.findUsers = findUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
