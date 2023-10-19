const { myDb } = require("../utils/db");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    myDb().collection("users").insertOne({ name, email, password });
    res.render("index", { name, email });
  } catch (error) {
    console.log(error.message);
  }
};

const findUsers = async (req, res) => {
  try {
    myDb()
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        res.render("index", { users });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(err);
  }
};

exports.createUser = createUser;
exports.findUsers = findUsers;
