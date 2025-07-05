"use client";

import { useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BugReportIcon from "@mui/icons-material/BugReport";
import PersonIcon from "@mui/icons-material/Person";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, CircleUserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const role = user?.role?.toUpperCase();

  return (
    <div className="sticky top-0 z-10 bg-[#F7F8FA] shadow-sm px-4 py-2">
      <div className="flex items-center justify-between sm:justify-end">
        {/* Left - Mobile Menu Icon */}
        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlignJustify
                onClick={() => setShow(!show)}
                className="cursor-pointer text-gray-600"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="mt-1 w-40">
              <Link href={role ? `/dashboard/${role.toLowerCase()}` : "/"}>
                <DropdownMenuItem className="gap-2">
                  <DashboardIcon fontSize="small" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/users">
                <DropdownMenuItem className="gap-2">
                  <PersonIcon fontSize="small" />
                  Users
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/project">
                <DropdownMenuItem className="gap-2">
                  <TaskAltIcon fontSize="small" />
                  Projects
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/issue">
                <DropdownMenuItem className="gap-2">
                  <BugReportIcon fontSize="small" />
                  Issues
                </DropdownMenuItem>
              </Link>
              
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right - Notifications & User */}
        <div className="flex items-center space-x-6 ">
          <div className="relative">
            <NotificationsActiveIcon className="text-gray-600 text-2xl cursor-pointer" />
            <div className="absolute -top-1.5 -right-2 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">
              1
            </div>
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="cursor-pointer text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-1 w-40">
              <DropdownMenuItem
                disabled
                className="justify-center font-semibold text-gray-700"
              >
                {user?.name || "User"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer justify-center gap-2 text-red-500"
              >
                <LogoutIcon fontSize="small" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
