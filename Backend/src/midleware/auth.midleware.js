const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Authenticate User (Extracts user from token)
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user details to request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

// ✅ Authorize User Based on Role
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Access denied. You do not have permission." });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles };
