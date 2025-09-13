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
  },
});

const Room = mongoose.model("Room", roomSchema);

// Room will be deleted after 24 hours of inactivity

// Room.createIndexes({ lastMessage: 1 }, { expireAfterSeconds: 86400 });
module.exports = Room;
