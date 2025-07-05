const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const projectSchema= require("./project.schema");


const createProject = async (req, res) => {
    try {
        const userExists = await prisma.user.findUnique({
            where: { userId: req.user.userId },
        });

        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "Error - User not found. Cannot create project.",
            });
        }

        const data = projectSchema.create.parse(req.body);

        const newProject = await prisma.project.create({
            data: {
                ...data,
                createdById: req.user.userId, 
            },
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: newProject,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const getAllProjects = async (req, res) => {
  try {
    const user = req.user; // comes from auth middleware (make sure it's set correctly)
    const role = user.role;
    const userId = user.id;

    let projects;

    if (role === "ADMIN" || role === "MANAGER") {
      // Show all projects
      projects = await prisma.project.findMany({
        include: {
          tasks: true,
          issues: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } else if (role === "EMPLOYEE") {
      // Show only projects where this employee has tasks
      projects = await prisma.project.findMany({
        where: {
          tasks: {
            some: {
              assignedToId: userId // adjust if your field is named differently
            }
          }
        },
        include: {
          tasks: {
            where: {
              assignedToId: userId
            }
          },
          issues: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role."
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetching projects",
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`
    });
  }
};


const getSingleProject = async (req, res) => {
    try {
        const projectId = parseInt(req.params.id);

        const project = await prisma.project.findUnique({
            where: { project_id: projectId },
            include: {
                tasks: true,
                issues: true,
                createdBy: true,
            },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project retrieved successfully",
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        const validateData =projectSchema.update.parse(req.body);

        const existingProject = await prisma.project.findUnique({
            where: {
                 project_id: projectId 
                },
        });

        if (!existingProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

      const updatedProject =  await prisma.project.update({
            where: { project_id: projectId },
            data: validateData,
        });
        

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: updatedProject,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = parseInt(req.params.id);

        const project = await prisma.project.findUnique({
            where: { 
                project_id: projectId 
            },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

       const deletedProject =  await prisma.project.delete({
            where: { 
                project_id: projectId
             },
        });

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: deletedProject
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};



module.exports = {createProject,getAllProjects,getSingleProject,updateProject,deleteProject}