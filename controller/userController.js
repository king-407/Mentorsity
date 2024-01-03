const User = require("../models/user");

/////ROUTE FOR SIGNUP//
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      next("Please enter all details");
    }
    const ifExist = await User.findOne({ email });
    if (ifExist) {
      return next("User with this email already exists");
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    return res.status(200).json({ message: "Signup Sucessfull" });
  } catch (e) {
    console.log(e);
  }
};
// ROUTE FOR LOGIN//
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide field");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next("user not found");
    }
    const isMatch = await user.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return next("Invalid credentials");
    }
    req.session.isAuth = true;
    return res.status(200).json({ success: "true", user });
  } catch (e) {
    next(e);
  }
};

///// TO CHECK IF A USER CAN ACCESS PROTECTED DATA///
const protectedData = (req, res, next) => {
  console.log("Able to see protected data");
};
module.exports = { signup, loginController, protectedData };
