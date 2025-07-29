const jwt = require("jsonwebtoken");
const userModel = require('../model/users');
require("dotenv").config();
console.log(
  "JWT_KEY at verify:",
  (process.env.JWT_SECRET)
);

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


// const token = localStorage.getItem("token");

// fetch("http://localhost:3000/api/protected", {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
