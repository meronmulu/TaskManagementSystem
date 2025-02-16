const { z } = require("zod");

const issueSchema = {
    create: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        projectId: z.string().min(1, "Project ID is required"),
        reportedById: z.string().min(1, "Reported By ID is required"),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    }),
    update: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    }),
};

module.exports = issueSchema;