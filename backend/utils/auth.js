const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// dotenv.config();

const authVerify = (req, res, next) => {
  try {
    // console.log(req);
    // console.log(req.cookies.token);

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access, token is missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { authVerify };
