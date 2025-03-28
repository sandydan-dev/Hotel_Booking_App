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

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token invalid!",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
