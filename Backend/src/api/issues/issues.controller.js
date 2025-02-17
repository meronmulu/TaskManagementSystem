const { PrismaClient } = require("@prisma/client");
const issueSchema = require("./issues.schema");

const prisma = new PrismaClient();

const createIssue = async (req, res) => {
    try {
        const data = issueSchema.create.parse(req.body);

        const projectExists = await prisma.project.findUnique({
            where: { project_id: data.projectId },
        });

        if (!projectExists) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const userExists = await prisma.user.findUnique({
            where: { userId: data.reportedById },
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const newIssue = await prisma.issue.create({
            data: {
                title: data.title,
                description: data.description,
                projectId: data.projectId,
                reportedById: data.reportedById,
                priority: data.priority || "MEDIUM",
            },
        });

        return res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: newIssue,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

const getAllIssues = async (req, res) => {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                project: true,
                reportedBy: true,
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
        const issueId = req.params.id;
        const issue = await prisma.issue.findUnique({
            where: { issue_id: issueId },
            include: {
                project: true,
                reportedBy: true,
            },
        });
        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Fetching issue",
            data: issue,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const updateIssue = async (req, res) => {
    try {
        const issueId = req.params.id;
        const data = issueSchema.update.parse(req.body);
        
        const isIssueExist = await prisma.issue.findUnique({
            where: { issue_id: issueId },
        });
        if (!isIssueExist) {
            return res.status(404).json({
                success: false,
                message: "Issue does not exist",
            });
        }

        const updatedIssue = await prisma.issue.update({
            where: { issue_id: issueId },
            data: { ...data }
        });
        return res.status(200).json({
            success: true,
            message: "Issue successfully updated",
            data: updatedIssue
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`
        });
    }
};

const deleteIssue = async (req, res) => {
    try {
        const issueId = req.params.id;
        const isIssueExist = await prisma.issue.findUnique({
            where: { issue_id: issueId },
        });
        if (!isIssueExist) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            });
        }
        await prisma.issue.delete({
            where: { issue_id: issueId },
        });
        return res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
};

module.exports = { createIssue, getAllIssues, getSingleIssue, updateIssue, deleteIssue };
