const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email must be provided"],
    },
    password: {
      type: String,
      require: [true, "Phone number must be provided"],
    },
  },
  { timestamps: true }
);

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("Users", userSchema);
