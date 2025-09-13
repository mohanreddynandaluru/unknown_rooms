const Room = require("../model/room");

const getDefaultRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: 1 }).limit(8);

    if (rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    res.status(200).json({ rooms });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomName, subtitle } = req.body;
    if (!roomName) {
      return res.status(400).json({ message: "Room name is required" });
    }
    let roomId;
    let room;
    do {
      roomId = Math.floor(100000 + Math.random() * 900000);
      room = await Room.findOne({ roomId }).sort({ createdAt: -1 }).limit(1);
    } while (room);

    const newRoom = new Room({ roomName, roomId, subtitle });
    await newRoom.save();
    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findOne({ roomId: id });
    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }
    return res.status(200).json(room);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { getDefaultRooms, createRoom, getRoomById };
