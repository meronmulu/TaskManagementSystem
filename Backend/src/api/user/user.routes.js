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


router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", authenticateUser, authorizeRoles("ADMIN"), getAllUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/update/:id", authenticateUser, updateUser);
router.delete("/delete/:id", authenticateUser, authorizeRoles("ADMIN"), deleteUser);

module.exports = router;
