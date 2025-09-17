// src/socket.js
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:4000";

const socket = io(BASE_URL, {
  withCredentials: true,
});

export default socket;
