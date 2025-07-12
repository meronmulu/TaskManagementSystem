const {PrismaClient}  = require("@prisma/client");
const prisma =  new PrismaClient();
const{ taskSchema} = require("./task.schema");
const { sendNotification } = require("../notification/notification.controller");
const { notifyTaskCompletion } = require("../notification/notification.controller");


const createTask = async (req, res) => {
    try {
        const data = taskSchema.create.parse(req.body);

        // ✅ Check project exists
        const projectExists = await prisma.project.findUnique({
            where: { project_id: data.projectId },
        });

        if (!projectExists) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        // ✅ Check assigned user exists (only if assignedToId is provided)
        if (data.assignedToId !== undefined && data.assignedToId !== null) {
            const userExists = await prisma.user.findUnique({
                where: { userId: data.assignedToId },
            });

            if (!userExists) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found",
                });
            }
        }

        const newTask = await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                projectId: data.projectId,
                assignedToId: data.assignedToId || null,
                dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
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
    console.log("REQ.USER:", req.user); 

    const { userId, role } = req.user;

    const tasks = await prisma.task.findMany({
      where: role === "EMPLOYEE"
        ? { assignedToId: userId }  
        : {}, 
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
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};



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
    const validateData = taskSchema.update.parse(req.body);

    const existingTask = await prisma.task.findUnique({
      where: { task_id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({ success: false, message: "task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { task_id: taskId },
      data: validateData,
      include: {
        assignedTo: true,
      },
    });

    // ✅ Notify admin/manager if employee completes the task
    if (
      req.user?.role === "EMPLOYEE" &&
      existingTask.status !== "COMPLETED" &&
      validateData.status === "COMPLETED"
    ) {
      await notifyTaskCompletion(taskId, req);
    }

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
};



const NotificationType = {
  TASK_ASSIGNED: "TASK_ASSIGNED",
  ISSUE_REPORTED: "ISSUE_REPORTED",
  TASK_COMPLETED: "TASK_COMPLETED",
  DEADLINE_APPROACHING: "DEADLINE_APPROACHING",
  GENERAL_NOTIFICATION: "GENERAL_NOTIFICATION",
};

const assignTask = async (req, res) => {
  try {
    const { assignedToId } = req.body;
    const { id: taskId } = req.params;

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
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { task_id: Number(taskId) },
      data: { assignedToId: Number(assignedToId) },
    });

    // ✅ Send notification
    await sendNotification(
      assignedToId,
      `You have been assigned a new task: ${updatedTask.title}`,
      NotificationType.TASK_ASSIGNED,
      req
    );

    return res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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


const getTasksByProject = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const projectId = parseInt(req.params.projectId);

    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const filter = {
      projectId,
      ...(role === "EMPLOYEE" && { assignedToId: userId }),
    };

    const tasks = await prisma.task.findMany({
      where: filter,
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
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getTasksByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
      include: {
        project: {
          select: {
            project_id: true,
            project_name: true,
          },
        },
        assignedTo: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks by user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {createTask,getAllTasks,getSingleTask,updateTask,deleteTask,assignTask,getTasksByProject,getTasksByUser}