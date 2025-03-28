const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "You are not authenticated!",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token); // Debugging log

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  // Debugging log for JWT_SECRET
  console.log("JWT Secret:", process.env.JWT_SECRET_KEY);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("JWT Verification Error:", err.message); // Debugging log
      return res.status(403).json({
        message: "Token invalid!",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
