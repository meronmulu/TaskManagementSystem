const { PrismaClient } = require("@prisma/client");
const userSchema = require("./user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
        const data = userSchema.create.parse(req.body);

        // Check if email already exists
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

        // Hash password
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
        

        // Generate JWT Token
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
        const userId =parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: {
                userId: userId, 
            },
            include: {
                projects: true,
                tasks: true,
                issues: true,
                    
            }
        });

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found"
             });
        }

        res.status(200).json({ 
            success: true, 
            message: "users retrieved successfully",
            data: user,
             
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error",
             error: error.message 
        });
    }
};



const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const data = userSchema.update.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where: { userId },
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

       

        if (data.email) {
            const existingUserWithEmail = await prisma.user.findUnique({
                where: { email: data.email },
            });

            if (existingUserWithEmail && existingUserWithEmail.userId !== userId) {
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
            where: { userId },
            data,
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};





const deleteUser = async (req, res) => {
    try {

        const userId = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: { userId: userId },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete the user
        await prisma.user.delete({
            where: { userId: userId },
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
