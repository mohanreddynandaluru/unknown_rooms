const express = require("express");
const router = express.Router();

const { getMessages, createMessage } = require("../controller/message");
const { authVerify } = require("../utils/auth");

router.get("/:room", authVerify, getMessages);
router.post("/:room", authVerify, createMessage);

module.exports = router;
