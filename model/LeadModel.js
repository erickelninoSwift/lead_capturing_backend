const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name must be provided"],
  },
  email: {
    type: String,
    require: [true, "email must be provided"],
  },
  phone: {
    type: Number,
    require: [true, "Phone number must be provided"],
  },
  createdAt: {
    type: String,
  },
});

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("Lead", leadsSchema);
