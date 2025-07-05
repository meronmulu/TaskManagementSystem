"use client";

import { useState } from "react";
import { Issue, Project, Task } from "@/app/types/index";
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
import { deleteIssue } from "@/service/IssueService";

export const getUserColumns = (
  setIssue: React.Dispatch<React.SetStateAction<Issue[]>>
): ColumnDef<Issue>[] => [
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
    accessorKey: "project.project_name",
    header: "Project",
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
    header: "Reported By",
    cell: ({ row }) => row.original.reportedBy?.name,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const issue = row.original;
      const [open, setOpen] = useState(false);

      const confirmDelete = async () => {
        try {
          const success = await deleteIssue(issue.issue_id);
          if (success) {
           setIssue((prev) => prev.filter((u) => u.issue_id !== issue.issue_id));
          } else {
            alert("Failed to delete issue");
          }
          setOpen(false);
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Error deleting issue");
          setOpen(false);
        }
      };

      return (
        <>
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
              
                <Link href={`/dashboard/issue/${issue.issue_id}`}>
                <DropdownMenuItem>
                    Edit
                </DropdownMenuItem>
                </Link>
              

              <DropdownMenuItem onClick={() => setOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={setOpen}>
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
                  onClick={() => setOpen(false)}
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
        </>
      );
    },
  },
];
