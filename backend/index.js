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
const { initSocket } = require("./io/socketIO");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://unknown-rooms.vercel.app",
    credentials: true,
  })
);

const server = createServer(app);

initSocket(server);

app.use("/user", userRoute);
app.use("/rooms", roomRoute);
app.use("/message", messageRoute);

server.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});
