const { PrismaClient } = require("@prisma/client");
const notificationSchema = require("./notification.schema");

const prisma = new PrismaClient();

const sendNotification = async (userId, message, type, io) => {
    try {
        const validatedData = notificationSchema.parse({
            userId,
            message,
            type,
            isRead: false,
        });

        const notification = await prisma.notification.create({
            data: validatedData,
        });

        io.to(userId).emit("new_notification", notification);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const getAllNotification = async (req, res) => {
    try {
        const userId = req.user.userId;
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ 
            success: true, 
            data: notifications 
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const markNotificationAsRead = async (req, res) => {  
    try {
        const { id } = req.params;
        await prisma.notification.update({
            where: { id: parseInt(id) },
            data: { isRead: true },
        });

        res.status(200).json({ 
            success: true, 
            message: "Notification marked as read" 
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

module.exports = { sendNotification, getAllNotification, markNotificationAsRead };
