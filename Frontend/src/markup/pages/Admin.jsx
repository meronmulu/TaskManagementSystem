import React, { useState } from "react";
import UserManagement from "../component/admin/UserManagement";
import ProjectManagement from "../component/admin/ProjectManagement";
import TAskManagement from "../component/admin/TAskManagement";
import IssuesManagement from "../component/admin/IssuesManagemnt"; 

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WorkIcon from "@mui/icons-material/Work"; 
import BugReportIcon from "@mui/icons-material/BugReport"; 

function Admin() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen mt-16"> 
      {/* Sidebar (Left Part) */}
      <div className="w-70 p-4 shadow-md bg-white"> 
        <nav className="space-y-4">
          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === "dashboard"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelectedSection("dashboard")}
          >
            <DashboardIcon />
            <p>Dashboard</p>
          </div>

          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === "userManagement"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelectedSection("userManagement")}
          >
            <PersonIcon />
            <p>User Management</p>
          </div>

          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === "projectManagement"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelectedSection("projectManagement")}
          >
            <WorkIcon />
            <p>Project Management</p>
          </div>

          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === "taskManagement"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelectedSection("taskManagement")}
          >
            <TaskAltIcon />
            <p>Task Management</p>
          </div>

          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === "issuesManagement"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelectedSection("issuesManagement")}
          >
            <BugReportIcon />
            <p>Issues Management</p>
          </div>
        </nav>
      </div>

      {/* Content (Right Part) */}
      <div className="flex-1 p-6 bg-gray-50">
        {selectedSection === "dashboard" && (
          <p className="text-lg mt-4">Welcome to the Dashboard!</p>
        )}
        {selectedSection === "userManagement" && <UserManagement />}
        {selectedSection === "projectManagement" && <ProjectManagement />}
        {selectedSection === "taskManagement" && <TAskManagement />}
        {selectedSection === "issuesManagement" && <IssuesManagement />}
      </div>
    </div>
  );
}

export default Admin;
