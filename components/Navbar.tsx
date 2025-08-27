"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BugReportIcon from "@mui/icons-material/BugReport";
import PersonIcon from "@mui/icons-material/Person";

import {
  AlignJustify,
  ArrowDownToLineIcon,
  CircleUserRound,
  ShieldCloseIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/context/AuthContext";
import socket from "@/lib/socket";

import {
  fetchNotifications,
  markAsRead,
  deleteNotification,
} from "@/service/NotificationService";

type Notification = {
  notification_id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = user?.role?.toUpperCase();

  // Load initial notifications
  const loadNotifications = async () => {
    if (!user?.userId) return;
    const data = await fetchNotifications(user.userId);
    setNotifications(data);
  };

  // Setup Socket.io and load notifications
  useEffect(() => {
    if (!user?.userId) return;

    socket.emit("joinRoom", user.userId);
    loadNotifications();

    socket.on("newNotification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, [user?.userId]);

  // Click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: number) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.notification_id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleDeleteNotification = async (id: number) => {
    await deleteNotification(id);
    setNotifications((prev) =>
      prev.filter((n) => n.notification_id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="sticky top-0 z-10 bg-[#F7F8FA] shadow-sm px-4 py-2">
      <div className="flex items-center justify-between sm:justify-end">
        {/* Mobile Menu */}
        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlignJustify
                onClick={() => setShowMobileMenu((prev) => !prev)}
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

        {/* Right Side */}
        <div className="flex items-center space-x-6 relative">
          {/* Notifications */}
          <div className="relative" ref={dropdownRef}>
            <NotificationsActiveIcon
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={() => setOpenDropdown((prev) => !prev)}
            />
            {unreadCount > 0 && (
              <div className="absolute -top-1.5 -right-2 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">
                {unreadCount}
              </div>
            )}

            {/* Notification Dropdown */}
            {openDropdown && (
              <div className="absolute top-10 right-0 bg-white shadow-lg border rounded-xl w-80 max-h-96 overflow-y-auto z-50">
                {notifications.length === 0 ? (
                  <p className="text-center p-5 text-gray-400 font-medium">
                    No notifications
                  </p>
                ) : (
                  notifications.slice(0, 5).map((note) => (
                    <div
                      key={note.notification_id}
                      className={`group px-4 py-3 border-b last:border-b-0 text-sm flex items-start justify-between gap-2 transition-all ${
                        note.isRead ? "bg-white" : "bg-blue-50 font-semibold"
                      } hover:bg-gray-50`}
                    >
                      <div>
                        <p className="text-gray-800">{note.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(note.createdAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2 pt-1">
                        {!note.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(note.notification_id)}
                            title="Mark as Read"
                            className="text-green-600 hover:text-green-800"
                          >
                            <ArrowDownToLineIcon size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(note.notification_id)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700"
                        >
                          <ShieldCloseIcon size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Info */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <CircleUserRound className="cursor-pointer text-gray-600" />
                <p className="font-semibold">{user?.name}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-1 w-40">
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
