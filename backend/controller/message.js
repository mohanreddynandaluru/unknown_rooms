const Message = require("../model/message");
const Room = require("../model/room");
const User = require("../model/user");

const getMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const { before, limit = 20 } = req.query;
    const roomId = await Room.findById(room);
    if (!roomId) {
      return res.status(404).json({ message: "Room not found" });
    }
    const query = { room: roomId };

    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const beforeDate = new Date(before);
    const fourHoursAgo = new Date(beforeDate.getTime() - 4 * 60 * 60 * 1000);

    query.createdAt = { $gt: fourHoursAgo };

    // console.log(req.user);
    await User.findByIdAndUpdate(req.user.id, {
      lastSeen: new Date(),
    });

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("user", "userName")
      .lean();

    const defaultAvatar =
      "https://tse2.mm.bing.net/th/id/OIP.sznKTawHmg0kF5VJPFpE5AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3";

    const updatedMessages = messages.map((message) => {
      const isCurrentUser = message.user._id?.toString() === req.user.id;
      return {
        userName: isCurrentUser ? "You" : message.user.userName,
        avatar: defaultAvatar,
        text: message.message,
        type: isCurrentUser ? "user" : "other",
        ...(isCurrentUser && { status: "sent" }),
      };
    });

    res.json(updatedMessages.reverse());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const createMessage = async (req, res) => {
  try {
    let { room } = req.params;
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const roomId = await Room.findById(room);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const newMessage = new Message({
      user: req.user.id,
      room: roomId,
      message,
    });
    await newMessage.save();

    const defaultAvatar =
      "https://tse2.mm.bing.net/th/id/OIP.sznKTawHmg0kF5VJPFpE5AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3";

    const formattedMessage = {
      userName: "You",
      avatar: defaultAvatar,
      text: message,
      type: "user",
      status: "sending",
    };

    res.status(201).json({
      message: "Message sent successfully",
      newMessage: formattedMessage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { getMessages, createMessage };
