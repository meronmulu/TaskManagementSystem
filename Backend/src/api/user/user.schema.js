const { z } = require("zod");

const userSchema = {
    create: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE", "CLIENT"]).optional(),
    }),
    login: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    }),
    update: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().optional(),
        role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE", "CLIENT"]).optional(),
    }),
};

module.exports = userSchema;