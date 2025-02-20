const express = require("express");
const { 
    createUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require("./user.controller");

// const { authenticateUser, authorizeRoles } = require("../../midleware/auth.midleware")

const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id",getUserById);
router.put("/update/:id",updateUser);
router.delete("/delete/:id" , deleteUser);

module.exports = router;
