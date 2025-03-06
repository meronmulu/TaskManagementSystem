import React, { useState } from 'react';
import ProjectManagement from '../component/admin/ProjectManagement';
import TAskManagement from '../component/admin/TAskManagement';
import IssuesManagemnt from '../component/admin/IssuesManagemnt';

import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkIcon from '@mui/icons-material/Work';  
import BugReportIcon from '@mui/icons-material/BugReport';  

function Manager() {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  return (
    <>
  
    <div className="flex mt-16 ">
      {/*  (Left Part) */}
      <div className="h-screen w-70 p-4 shadow-md">
        <nav className="space-y-4">
         
          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
            }`}
            onClick={() => setSelectedSection('dashboard')}
          >
            <DashboardIcon />
            <p>Dashboard</p>
          </div>
         
          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === 'projectManagement' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
            }`}
            onClick={() => setSelectedSection('projectManagement')}
          >
            <WorkIcon />
            <p>Project Management</p>
          </div>

        
          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === 'taskManagement' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
            }`}
            onClick={() => setSelectedSection('taskManagement')}
          >
            <TaskAltIcon />
            <p>Task Management</p>
          </div>

          
          <div
            className={`text-lg py-2 px-4 rounded cursor-pointer transition flex gap-2 ${
              selectedSection === 'issuesManagement' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
            }`}
            onClick={() => setSelectedSection('issuesManagement')}
          >
            <BugReportIcon />
            <p>Issues Management</p>
          </div>
        </nav>
      </div>

      {/*  (Right Part) */}
      <div className="flex-1 p-6 bg-gray-50">
        {selectedSection === 'dashboard' && <p className="text-lg mt-4">Welcome to the Dashboard!</p>}
        {selectedSection === 'projectManagement' && <ProjectManagement />}
        {selectedSection === 'taskManagement' && <TAskManagement />}
        {selectedSection === 'issuesManagement' && <IssuesManagemnt />}
      </div>
    </div>
   

   </> 
);   
}

export default Manager;
