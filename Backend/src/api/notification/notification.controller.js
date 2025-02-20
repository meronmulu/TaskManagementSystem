const { PrismaClient } = require("@prisma/client");
const notificationSchema = require("./notification.schema");

const prisma = new PrismaClient();

const sendNotification = async (userId, message, type, req) => {
    try {
        const newNotification = await prisma.notification.create({
            data: { userId, message, type },
        });

        const io = req.app.get("io"); 
        io.to(`user_${userId}`).emit("newNotification", newNotification);

        return newNotification;
    } catch (error) {
        console.error("Error sending notification:", error.message);
    }
};

const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await prisma.notification.findMany({
            where: { userId: Number(userId) },
            orderBy: { createdAt: "desc" },
        });

        return res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};


const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = parseInt(req.params.id);
        const updatedNotification = await prisma.notification.update({
            where: { notification_id: notificationId },
            data: { isRead: true },
        });

        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: updatedNotification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error updating notification - ${error.message}`,
        });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notificationId = parseInt(req.params.id);
        await prisma.notification.delete({ where: { notification_id: notificationId } });

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error deleting notification - ${error.message}`,
        });
    }
};

module.exports = { sendNotification, getUserNotifications, markNotificationAsRead, deleteNotification };
