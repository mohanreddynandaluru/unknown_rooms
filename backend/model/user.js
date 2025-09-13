const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
