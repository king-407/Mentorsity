const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    unique: true,
    type: String,
  },
  password: {
    type: String,
  },
});
userSchema.methods.comparePassword = async function (password) {
  if (!this.isModified) return;
  const isMatch = await bcrypt.compare(password, this.password);
  console.log(isMatch);
  return isMatch;
};
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  // console.log("salt is " + salt);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, "hihihi");
};
module.exports = mongoose.model("User", userSchema);
