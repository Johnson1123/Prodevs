module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({
      status: false,
      message: "Access Denial",
    });
  }
  next();
};

res.setHeader("Set-Cookie", "loggedIn=true; Max-age=10; ");
// Expires, Secure
req.get("Cookie");

// express-session
