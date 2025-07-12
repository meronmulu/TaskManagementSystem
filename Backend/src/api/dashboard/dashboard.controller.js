const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getManagerDashboardSummary = async (req, res) => {
  try {
    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();
    const totalIssues = await prisma.issue.count();

    return res.status(200).json({
      totalProjects,
      totalTasks,
      totalIssues,
    });
  } catch (err) {
    console.error("Dashboard summary error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getManagerDashboardSummary };
