const AuthService = require("./auth.service");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const payload = await AuthService.verifyToken(token);
    req.user = payload; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// Role-based middleware
const roleMiddleware = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: "Forbidden" });
  next();
};

module.exports = { authMiddleware, roleMiddleware };
