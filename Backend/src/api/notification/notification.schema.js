const { z } = require("zod")


    const notificationSchema = z.object({
        userId: z.number().positive(),
        message: z.string().min(1),
        type: z.enum(["task", "issue", "general"]),
        isRead: z.boolean().optional().default(false),
    });
    
module.exports = notificationSchema;
