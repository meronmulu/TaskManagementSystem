const jwt = require("jsonwebtoken");
const prisma = require("../../config/prisma"); // Adjust path if needed
require("dotenv").config();

// ✅ Authenticate User (Extract user from token)
const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔍 Ensure user exists in the database
        const user = await prisma.user.findUnique({
            where: { userId: decoded.userId },
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        req.user = user; // Attach the user object to request
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

// ✅ Make sure to export both functions
module.exports = { authenticateUser, authorizeRoles };
