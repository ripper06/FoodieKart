const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { serverConfig } = require("../config");

const protect = async (req, res, next) => {
    //console.log(req.headers.authorization);
  try {
    let token;

    // 1. Check header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, serverConfig.JWT_SECRET);

      // 3. Get user (without password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 4. Attach to request
      req.user = user;

      next();
    } else {
      return res.status(401).json({ message: "No token provided" });
    }

  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };