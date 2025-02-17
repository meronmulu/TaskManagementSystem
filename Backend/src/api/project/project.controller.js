const { PrismaClient } = require("@prisma/client");
const {projectSchema} = require("./project.schema");

const prisma = new PrismaClient();

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
        console.log("Project Schema:", projectSchema);

        
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
        const projects = await prisma.project.findMany();
        res.status(200).json({
            success: true,
            message: "Fetching all projects",
            data: projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const getSingleProject = async (req, res) => {
    try {
        const projectId = req.params.id; // Fixed 'param' to 'params'
        const project = await prisma.project.findUnique({
            where: {
                project_id: projectId
            },
        });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Fetching project",
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
        const projectId = req.params.id; 
        const data = projectSchema.update.parse(req.body);
        const isProjectExist = await prisma.project.findUnique({
            where: {
                project_id: projectId,
            },
        });
        if (!isProjectExist) {
            return res.status(404).json({
                success: false,
                message: "Project does not exist",
            });
        }
        const updatedProject = await prisma.project.update({
            where: {
                project_id: projectId
            },
            data: {
                ...data
            }
        });
        return res.status(200).json({
            success: true,
            message: "Project successfully updated",
            data: updatedProject
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id; 
        const isProjectExist = await prisma.project.findUnique({
            where: {
                project_id: projectId,
            },
        });
        if (!isProjectExist) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const deletedProject = await prisma.project.delete({
            where: {
                project_id: projectId,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: deletedProject,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

module.exports = { createProject, getAllProjects, getSingleProject, updateProject, deleteProject };
