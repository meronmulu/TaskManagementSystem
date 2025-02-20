const {PrismaClient}  = require("@prisma/client");
const prisma =  new PrismaClient();
const{ taskSchema} = require("./task.schema");
const { sendNotification } = require("../notification/notification.controller");


const createTask = async (req, res) => {
    try {
        const data = taskSchema.create.parse(req.body); 

        const projectExists = await prisma.project.findUnique({
            where: { project_id: data.projectId },
        });

        if (!projectExists) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const newTask = await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                projectId: data.projectId,
                assignedToId: null, 
                dueDate: new Date(data.dueDate),
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
const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                project: true,
                assignedTo: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            success: true,
            message: "Fetching all projects",
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
}
const getSingleTask = async (req, res) => {

    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID",
            });
        }


        const tasks = await prisma.task.findUnique({
          where:{
            task_id: taskId
          },
          include:{
            assignedTo: true,
            project: true,
            
          }
   }); 
       if(!tasks){
        return res.status(404).json({
            success: false,
            message: "task not found",
        });
       }
       res.status(200).json({
        success: true,
        message: "task retrieved successfully",
        data: tasks,
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        }); 
    }

  
}
const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const validateData =taskSchema.update.parse(req.body);

        const existingTask = await prisma.task.findUnique({
            where: {
                 task_id: taskId 
                },
        });

        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "task not found",
            });
        }

      const updatedTask =  await prisma.task.update({
            where: { task_id: taskId },
            data: validateData,
        });
        

        res.status(200).json({
            success: true,
            message: "task updated successfully",
            data: updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }

}
const deleteTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);

        const task = await prisma.task.findUnique({
            where: { 
                task_id: taskId 
            },
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "task not found",
            });
        }

       const deletedTask =  await prisma.task.delete({
            where: { 
                task_id: taskId
             },
        });

        return res.status(200).json({
            success: true,
            message: "task deleted successfully",
            data: deletedTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }

}
const assignTask = async (req, res) => {
    try {
        const { taskId, assignedToId } = req.body;
        console.log("Received Data:", req.body);

        if (!taskId || !assignedToId || isNaN(taskId) || isNaN(assignedToId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID or user ID",
            });
        }

        const taskExists = await prisma.task.findUnique({
            where: { task_id: Number(taskId) },
        });

        if (!taskExists) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const userExists = await prisma.user.findUnique({
            where: { userId: Number(assignedToId) },
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updatedTask = await prisma.task.update({
            where: { task_id: Number(taskId) },
            data: { assignedToId: Number(assignedToId) },
        });

        await sendNotification(assignedToId, `You have been assigned a new task: ${updatedTask.title}`, "TASK",req);

        const io = req.app.get("io");
        io.to(`user_${assignedToId}`).emit("taskAssigned", {
            message: `You have been assigned a new task: ${updatedTask.title}`,
            task: updatedTask,
        });

        return res.status(200).json({
            success: true,
            message: "Task assigned successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.error("Error assigning task:", error);
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};



module.exports = {createTask,getAllTasks,getSingleTask,updateTask,deleteTask,assignTask}