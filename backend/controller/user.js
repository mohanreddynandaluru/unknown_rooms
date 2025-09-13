const User = require("../model/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { userName } = req.body;
  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    let user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    user = new User({ userName });
    await user.save();
    console.log(user);

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", userName });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getUser = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    await User.findByIdAndUpdate(req.user.id, {
      lastSeen: new Date(),
    });
    if (req.user) {
      return res.status(200).json({ userName: req.user.userName });
    }
    return res.status(401).json({ message: "Authorization denied" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { createUser, getUser };
