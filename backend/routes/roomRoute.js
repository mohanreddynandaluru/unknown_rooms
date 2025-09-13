const router = require("express").Router();

const {
  getDefaultRooms,
  createRoom,
  getRoomById,
} = require("../controller/room");
const { authVerify } = require("../utils/auth");

router.get("/", getDefaultRooms);

router.post("/", authVerify, createRoom);

router.get("/:id", getRoomById);

module.exports = router;
