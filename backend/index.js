const express = require("express");
const { createServer } = require("http");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./utils/db");
connectDB();
const cors = require("cors");
const { Server } = require("socket.io");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const messageRoute = require("./routes/messageRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use("/user", userRoute);
app.use("/rooms", roomRoute);
app.use("/message", messageRoute);

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
