// module.exports = (req, res, next) => {
//   if (!req.session.isLoggedIn) {
//     return res.status(401).json({
//       status: false,
//       message: "Access Denial",
//     });
//   }
//   next();
// };

// res.setHeader("Set-Cookie", "loggedIn=true; Max-age=10; ");
// // Expires, Secure
// req.get("Cookie");

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      status: "Failed",
      message: "UnAuthorized, please login",
    });
  }

  const user = await jwt.verify(token, process.env.JWT_SECRET);

  if (!user) {
    return res.status(401).json({
      status: "Failed",
      message: "UnAuthorized, invalid token",
    });
  }

  req.user = user._doc.email;

  next();
};
// express-session
