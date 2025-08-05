const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const checkForAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token found in cookies in auth middleware:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = checkForAuth;
