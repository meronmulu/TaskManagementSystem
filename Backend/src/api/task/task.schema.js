const { z } = require("zod");

const taskSchema = {
    create: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "BLOCKED"]),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        dueDate: z.preprocess((val) => {
        if (typeof val === "string") {
            return new Date(val);
        }
        return val;
    }, z.date()),
    projectId: z.string().uuid("Invalid Project ID"), 

    }),
    update: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "BLOCKED"]).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        dueDate: z.preprocess((val) => {
        if (typeof val === "string") {
            return new Date(val); // Convert "YYYY-MM-DD" to Date object
        }
        return val;
    }, z.date()), 
    })
};

module.exports = taskSchema;