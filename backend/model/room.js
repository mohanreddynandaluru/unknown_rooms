const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roomSchema = new schema({
  roomName: {
    type: String,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
    unique: true,
  },
  subtitle: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastMessage: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

const Room = mongoose.model("Room", roomSchema);

// Room will be deleted after 24 hours of inactivity

// Room.createIndexes({ lastMessage: 1 }, { expireAfterSeconds: 86400 });
module.exports = Room;
