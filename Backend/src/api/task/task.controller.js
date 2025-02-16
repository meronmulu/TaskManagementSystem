const { PrismaClient } = require("@prisma/client");
const taskSchema = require("./task.schema");
const { sendNotification } = require("../notification/notification.controller");

const prisma = new PrismaClient();

    // ✅ Create Task (No user assigned initially)
    const createTask = async (req, res) => {
        try {
            const data = taskSchema.create.parse(req.body);
    
            const newTask = await prisma.task.create({
                data: {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                    dueDate: data.dueDate,
                    project: {
                        connect: { project_id: data.projectId },
                    },
                    
                },
            });
    
            return res.status(201).json({
                success: true,
                message: "Task created successfully",
                data: newTask,
            });
    
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: `Error - ${error.message}`,
            });
        }
    };
  

const assignUserToTask = async (req, res) => {
        try {
            const { taskId, assignedToId } = req.body;
    
            // Check if task exists
            const task = await prisma.task.findUnique({
                where: { task_id: taskId }, // ✅ Use correct field name from Prisma schema
            });
    
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: "Task not found"
                });
            }
    
            // Check if user exists
            const user = await prisma.user.findUnique({
                where: { userId: assignedToId }, // ✅ Ensure correct field name from Prisma schema
            });
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
    
            // Update task with assigned user
            const updatedTask = await prisma.task.update({
                where: { task_id: taskId }, // ✅ Ensure correct field name
                data: { assignedToId },
            });
    
            // Get WebSocket instance
            const io = req.app.get("io");
    
            // Send notification
            await sendNotification(
                assignedToId,
                `You have been assigned a new task: ${updatedTask.title}`,
                "task",
                io
            );
    
            return res.status(200).json({
                success: true,
                message: "User assigned to task successfully",
                data: updatedTask,
                
            });
       
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: `Error - ${error.message}`,
            });
        }
    };
    
const getAllTasks =  async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        return res.status(200).json({
            success: true,
            message: "Fetching all tasks",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const getSingleTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await prisma.task.findUnique({ where: { task_id: taskId } });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Fetching task",
            data: task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

// ✅ Update Task
const updateTask = async (req, res) => {
     try {
        const taskId = req.params.id;
        const data = taskSchema.update.parse(req.body);

        // Ensure task exists
        const taskExists = await prisma.task.findUnique({ where: { task_id: taskId } });
        if (!taskExists) {
            return res.status(404).json({ success: false, message: "Task does not exist" });
        }

        // Update task
        const updatedTask = await prisma.task.update({
            where: { task_id: taskId },
            data: { ...data },
        });

        return res.status(200).json({
            success: true,
            message: "Task successfully updated",
            data: updatedTask,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

// ✅ Delete Task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Ensure task exists
        const taskExists = await prisma.task.findUnique({ where: { task_id: taskId } });
        if (!taskExists) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Delete task
        const deletedTask = await prisma.task.delete({ where: { task_id: taskId } });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: deletedTask,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
}

module.exports = { 
    createTask, 
    assignUserToTask, 
    getAllTasks, 
    getSingleTask, 
    updateTask, 
    deleteTask 
};
