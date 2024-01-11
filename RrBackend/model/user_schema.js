const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },

  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  profilepic: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "User",
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("users", userSchema);
