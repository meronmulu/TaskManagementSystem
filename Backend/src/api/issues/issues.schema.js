const { z } = require("zod");

const issueSchema ={
    create :z.object({
        title: z.string().min(3, "Title must be at least 3 characters long"),
        description: z.string().optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
        projectId: z.number().int().positive("Project ID must be a valid positive integer"),
        reportedById: z.number().int().positive("Reporter ID must be a valid positive integer"),
    }),
      update: z.object({
        title: z.string().min(3, "Title must be at least 3 characters long").optional(),
        description: z.string().optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
        projectId: z.number().int().positive("Project ID must be a valid positive integer"),
        reportedById: z.number().int().positive("Reporter ID must be a valid positive integer"),
    })
}
   

module.exports = issueSchema ;
