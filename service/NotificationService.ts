import axios from "@/app/axios";

export const fetchNotifications = async (userId: number) => {
  const res = await axios.get(`/notifications/${userId}`);
  console.log( res.data.data)
  return res.data.data; 
};

export const markAsRead = async (notification_id: number) => {
  try {
    const res = await axios.put(`/notifications/${notification_id}/read`);
    return res.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }
};

export const deleteNotification = async (notification_id: number) => {
  try {
    const res = await axios.delete(`/notifications/delete/${notification_id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return null;
  }
};

export const notifyTaskCompletion = async (taskId: number) => {
  try {
    await axios.post(`/notifications/task-completed/${taskId}`);
  } catch (error) {
    console.error("Failed to notify task completion:", error);
  }
};

export const notifyIssueCreated = async (issueId: number) => {
  try {
    await axios.post(`/notifications/issue-created/${issueId}`);
  } catch (error) {
    console.error("Failed to notify issue creation:", error);
  }
};

