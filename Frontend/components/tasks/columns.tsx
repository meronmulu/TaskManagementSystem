// columns.tsx
"use client";

import { useEffect, useState } from "react";
import { Project, Task, User } from "@/app/types/index";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { deleteProject } from "@/service/ProjectService";
import { AssignTasks, deleteTask } from "@/service/TaskService";
import { getAllUsers } from "@/service/UserService";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/context/AuthContext";

export const getUserColumns = (
  setTask: React.Dispatch<React.SetStateAction<Task[]>>
): ColumnDef<Task>[] => [
  {
    id: "toggle",
    header: "",
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded();
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => row.toggleExpanded()}
          className="p-0 dark:text-white"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const rawDate = row.original.dueDate;
      return rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "-";
    },
  },

  {
    header: "Assigned User",
    cell: ({ row }) => row.original.assignedTo?.name,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      const [openDelete, setOpenDelete] = useState(false);
      const [openAssign, setOpenAssign] = useState(false);
      const [users, setUsers] = useState<User[]>([]);
      const [selectedUserId, setSelectedUserId] = useState<string>("");
      const { user } = useAuth();
      const role = user?.role?.toUpperCase();

      const confirmDelete = async () => {
        try {
          const success = await deleteTask(task.task_id);
          if (success) {
            setTask((prev) => prev.filter((u) => u.task_id !== task.task_id));
          } else {
            alert("Failed to delete task");
          }
          setOpenDelete(false);
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Error deleting task");
          setOpenDelete(false);
        }
      };

      const handleAssign = async () => {
        if (!selectedUserId) return alert("Please select a user");

        console.log(
          "Assigning task:",
          task.task_id,
          "to user:",
          selectedUserId
        );

        const res = await AssignTasks({
          taskId: task.task_id,
          assignedToId: Number(selectedUserId),
        });

        if (res) {
          setTask((prevTasks) =>
            prevTasks.map((t) =>
              t.task_id === task.task_id
                ? { ...t, ...res.data } 
                : t
            )
          );

          setOpenAssign(false);
        } else {
          alert("Failed to assign task");
        }
      };

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await getAllUsers();
            setUsers(res);
          } catch (error) {
            console.error("Error fetching users", error);
          }
        };
        fetchUsers();
      }, []);

      return (
        <>
          {/* Dropdown Menu */}
          
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 dark:text-white">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:text-white">
              <DropdownMenuLabel className="dark:text-white">
                Actions
              </DropdownMenuLabel>
              {role !== "EMPLOYEE" && (
              <DropdownMenuItem onClick={() => setOpenAssign(true)}>
                Assign User
              </DropdownMenuItem>
              )}
              <Link
                href={`/dashboard/project/${task.projectId}/task/${task.task_id}`}
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              {role !== "EMPLOYEE" && (
              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                Delete
              </DropdownMenuItem>
            )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          

          {/* Delete Dialog */}
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent className="dark:bg-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-center dark:text-white">
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  This action cannot be undone. This will permanently delete the
                  task.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-6">
                <Button
                  variant="secondary"
                  onClick={() => setOpenDelete(false)}
                  className="dark:text-white"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  className="dark:text-white"
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Assign User Dialog */}
          <Dialog open={openAssign} onOpenChange={setOpenAssign}>
            <DialogContent className="dark:bg-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-center dark:text-white">
                  Assign User to Task
                </DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Select a user to assign this task
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Label>Select User</Label>
                <Select onValueChange={setSelectedUserId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.userId} value={String(user.userId)}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex justify-end gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setOpenAssign(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAssign}>Assign</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
