const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

//// HASHING THE PASSWORD //
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
