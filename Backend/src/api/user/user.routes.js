const express = require("express");
const { 
    createUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require("./user.controller");

const { authenticateUser, authorizeRoles } = require("../../midleware/auth.midleware")

const router = express.Router();

// ✅ Register & Login (Public)
router.post("/register", createUser);
router.post("/login", loginUser);

// ✅ Get All Users (Only ADMIN)
router.get("/all-users", authenticateUser, authorizeRoles("ADMIN"), getAllUsers);

// ✅ Get User by ID (Authenticated Users)
router.get("/:id", authenticateUser, getUserById);

// ✅ Update User (Only ADMIN or the user themselves)
router.put("/update/:id", authenticateUser, updateUser);

// ✅ Delete User (Only ADMIN)
router.delete("/delete/:id", authenticateUser, authorizeRoles("ADMIN"), deleteUser);

module.exports = router;
