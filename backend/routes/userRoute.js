const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controller/user");
const { authVerify } = require("../utils/auth");
router.get("/test", (req, res) => {
  res.send("user route is working");
});

router.post("/", createUser);
router.get("/", authVerify, getUser);

module.exports = router;
