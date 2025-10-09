const express = require("express");
const router = express.Router();
const { createUser, getUser, deleteUser } = require("../controller/user");
const { authVerify } = require("../utils/auth");
router.get("/test", (req, res) => {
  res.send("user route is working");
});

router.post("/", createUser);
router.get("/", authVerify, getUser);
router.delete("/", authVerify, deleteUser);

module.exports = router;
