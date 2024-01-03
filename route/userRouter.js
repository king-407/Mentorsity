const express = require("express");
const {
  signup,
  loginController,
  protectedData,
} = require("../controller/userController");
const isAuth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginController);

/// IN THIS ROUTE, isAuth CHECKS FIRST IF USER IS AUTHENTICATED, IF NOT THEN THE USER CANNOT ACCESS THE PROTECTED DATA //

router.post("/protected", isAuth, protectedData);
module.exports = router;
