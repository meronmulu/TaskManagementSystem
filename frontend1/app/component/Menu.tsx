import Link from 'next/link';
import React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WorkIcon from "@mui/icons-material/Work";
import BugReportIcon from "@mui/icons-material/BugReport";


    
    const  items = [
      {
        icon: <DashboardIcon className="text-gray-500" />, 
        label: 'Dashboard',
        href: '',
        visible: ['admin'],
      },
      {
        icon: <PersonIcon className="text-gray-500" />,
        label: 'User Management',
        href: '/dashboard/list/user',
        visible: ['admin', 'manager'],
      },
      {
        icon: <TaskAltIcon className="text-gray-500" />,
        label: 'Project Management',
        href: '/dashboard/list/project',
        visible: ['admin', 'manager'],
      },
      {
        icon: <WorkIcon className="text-gray-500" />,
        label: 'Task Management',
        href: '/dashboard/list/task',
        visible: ['admin', 'manager'],
      },
      {
        icon: <BugReportIcon className="text-gray-500" />,
        label: 'Issues Management',
        href: '/dashboard/list/issue',
        visible: ['admin'],
      },
    ]


const Menu = () => {
  return (
    <div className="mt-2 text-sm">
      {items
          // .filter((item) => item.visible.includes(role)) 
         . map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 py-2 rounded-md hover:bg-gray-200 md:px-2"
            >
              {item.icon} {/* Render the icon directly */}
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
       
    </div>
  );
};

export default Menu;
