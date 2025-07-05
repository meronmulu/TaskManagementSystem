'use client';

import Link from 'next/link';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BugReportIcon from '@mui/icons-material/BugReport';
import LogoutIcon from '@mui/icons-material/Logout';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import img from '../public/Taskfulll.gif'


const Menu = () => {
  const { user, logout } = useAuth();
  const role = user?.role?.toUpperCase();

  const items = [
    {
      icon: <DashboardIcon className="text-gray-500" />,
      label: 'Dashboard',
      href: role ? `/dashboard/${role.toLowerCase()}` : '/',
      visible: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
    },
    {
      icon: <PersonIcon className="text-gray-500" />,
      label: 'User Management',
      href: '/dashboard/users',
      visible: ['ADMIN'],
    },
    {
      icon: <TaskAltIcon className="text-gray-500" />,
      label: 'Project Management',
      href: '/dashboard/project',
      visible: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
    },
    {
      icon: <BugReportIcon className="text-gray-500" />,
      label: 'Issues Management',
      href: '/dashboard/issue',
      visible: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full px-2 py-4 bg-white ">

      {/* Menu Items */}
      <div className=" text-sm space-y-1">
         <div>
        <Image
          src={img}
          alt=''
          width={200}
          height={200}
          className="rounded-full hidden  md:block"
        />
      </div>
        {items
          .filter((item) => role && item.visible.includes(role))
          .map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 py-2 rounded-md hover:bg-gray-200"
            >
              {item.icon}
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
      </div>

     
    </div>

  );
};

export default Menu;
