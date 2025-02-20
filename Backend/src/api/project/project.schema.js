const { z }  = require("zod");
const projectSchema = {
    create: z.object({
        project_name: z.string().min(3, "Project name is required"),
        description: z.string().optional(),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
    }),
    update: z.object({
        project_name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
    }),
};

module.exports =  projectSchema ; 
