const { z } = require("zod");

const notificationSchema = z.object({
  userId: z.number().positive(),
  message: z.string().min(1),
  type: z.enum([
    "TASK_ASSIGNED",
    "ISSUE_REPORTED",
    "TASK_COMPLETED",
    "DEADLINE_APPROACHING",
    "GENERAL_NOTIFICATION",
  ]),
  isRead: z.boolean().optional().default(false),
});

module.exports = notificationSchema;
