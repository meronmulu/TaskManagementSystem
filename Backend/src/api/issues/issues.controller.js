const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const issueSchema = require("./issues.schema");


const createIssue = async (req, res) => {
    try {
        const data = issueSchema.create.parse(req.body);

        const projectExists = await prisma.project.findUnique({
            where: { 
                project_id: data.projectId 
            },
        });

        if (!projectExists) {
            return res.status(404).json({
                success: false,
                message: "issuenot found",
            });
        }

        if (data.taskId) {
            const taskExists = await prisma.task.findUnique({
                where: { task_id: data.taskId },
            });

            if (!taskExists) {
                return res.status(404).json({
                    success: false,
                    message: "Task not found",
                });
            }
        }

        const newIssue = await prisma.issue.create({
            data: {
                ...data,
                reportedById: req.user.userId,
            },
            include: {
                project: true,
            }
        });

        return res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: newIssue,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const getAllIssues = async (req, res) => {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                project: true
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            success: true,
            message: "Fetching all issues",
            data: issues,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const getSingleIssue = async (req, res) => {
    try {
        const issueId = parseInt(req.params.id);

        const issue = await prisma.issue.findUnique({
            where: { 
                issue_id   : issueId 
            },
            include: {
                project: true,
            },
        });

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "issue not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "issue retrieved successfully",
            data: issue,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const updateissue= async (req, res) => {
    try {
        const issueId = parseInt(req.params.id);
        const validateData =issueSchema.update.parse(req.body);

        const existingIssue = await prisma.issue.findUnique({
            where: {
                 issue_id: issueId 
                },
        });

        if (!existingIssue) {
            return res.status(404).json({
                success: false,
                message: "issue not found",
            });
        }

      const updatedissues=  await prisma.issue.update({
            where: { issue_id: issueId },
            data: validateData,
        });
        

        res.status(200).json({
            success: true,
            message: "issue updated successfully",
            data: updatedissues,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const deleteissue= async (req, res) => {
    try {
        const issueId = parseInt(req.params.id);

        const issues= await prisma.issue.findUnique({
            where: { 
                issue_id: issueId 
            },
        });

        if (!issues) {
            return res.status(404).json({
                success: false,
                message: "issue not found",
            });
        }

       const deletedissue=  await prisma.issue.delete({
            where: { 
                issue_id: issueId
             },
        });

        return res.status(200).json({
            success: true,
            message: "issue  deleted successfully",
            data: deletedissue
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};




module.exports = {createIssue,getAllIssues,getSingleIssue,updateissue,deleteissue}