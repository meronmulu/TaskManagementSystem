const { z } = require("zod");

const taskSchema = {
    create: z.object({
        title: z.string().min(3, "Task name is required"),
        description: z.string().min(3, "Description is required"),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
        projectId: z.number(),
        assignedToId: z.number().optional(),
        dueDate: z.string().optional(),
    }),
    update: z.object({
        title: z.string().min(3, "Task name is required"),
        description: z.string().min(3, "Description is required"),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
        projectId: z.number(),
        assignedToId: z.number().optional(),
        dueDate: z.string().optional(),
    })
};

module.exports = { taskSchema };
