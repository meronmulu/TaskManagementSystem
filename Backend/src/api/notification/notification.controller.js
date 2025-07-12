const { PrismaClient } = require("@prisma/client");
const notificationSchema = require("./notification.schema");

const prisma = new PrismaClient();

const sendNotification = async (userId, message, type, req) => {
  try {
    const newNotification = await prisma.notification.create({
      data: {
        userId: Number(userId),
        message,
        type,
        isRead: false,
      },
    });

    const io = req.app.get("io");
    io.to(`user_${userId}`).emit("newNotification", newNotification);

    // console.log(`📨 Notification sent to user_${userId}`);
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

// NEW: Notify Admin and Manager when a task is completed by an employee
const notifyTaskCompletion = async (taskId, req) => {
  try {
    const task = await prisma.task.findUnique({
      where: { task_id: taskId },
      select: { title: true },
    });

    if (!task) return;

    const usersToNotify = await prisma.user.findMany({
      where: { role: { in: ["ADMIN", "MANAGER"] } },
      select: { userId: true },
    });

    const message = `Task "${task.title}" has been marked as completed by the employee.`;

    for (const user of usersToNotify) {
      await sendNotification(user.userId, message, "TASK_COMPLETED", req);
    }
  } catch (error) {
    console.error("Error notifying task completion:", error.message);
  }
};

// NEW: Notify Admin and Manager when an issue is created
const notifyIssueCreated = async (issueId, req) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { issue_id: issueId },
      select: { title: true },
    });

    if (!issue) return;

    const usersToNotify = await prisma.user.findMany({
      where: { role: { in: ["ADMIN", "MANAGER"] } },
      select: { userId: true },
    });

    const message = `A new issue titled "${issue.title}" has been created.`;

    for (const user of usersToNotify) {
      await sendNotification(user.userId, message, "ISSUE_CREATED", req);
    }
  } catch (error) {
    console.error("Error notifying issue creation:", error.message);
  }
};

module.exports = {
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
  notifyTaskCompletion,
  notifyIssueCreated,
};
