const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "https://unknown-rooms.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("✅ New client connected:", socket.id);

    // Join a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      //   console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, userName, message }) => {
      //   console.log(`Message in room ${roomId} from ${userName}:`, message);

      socket.to(roomId).emit("receiveMessage", { userName, message });
    });

    socket.on("disconnect", () => {
      //   console.log("❌ Client disconnected:", socket.id);
    });

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`❌ ${socket.id} left room ${roomId}`);
    });
  });
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { initSocket, getIO };
