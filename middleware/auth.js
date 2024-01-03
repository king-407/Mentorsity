const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(200).send("Login to continue");
  }
};
module.exports = isAuth;
