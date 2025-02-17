const { PrismaClient } = require("@prisma/client");
const userSchema = require("./user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();


const createUser = async (req, res) => {
    try {
        const data = userSchema.create.parse(req.body);

        const existingUser = await prisma.user.findUnique({  
            where: {
                 email: data.email
                 },
        });

        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already registered" });
        }

        data.password = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({ data });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = userSchema.login.parse(req.body);

        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        

        const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await prisma.user.findUnique({
            where: {
                userId: id, 
            },
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params; 
    const { user } = req; 

    try {
        if (user.role !== "ADMIN" && user.userId !== id) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You can only update your own profile.",
            });
        }

        const data = userSchema.create.partial().parse(req.body);

        if (data.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: data.email },
            });

            if (existingUser && existingUser.userId !== id) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use by another user.",
                });
            }
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { userId: id },
            data,
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const user = await prisma.user.findUnique({
            where: { userId: id },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await prisma.user.delete({
            where: { userId: id },
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };
