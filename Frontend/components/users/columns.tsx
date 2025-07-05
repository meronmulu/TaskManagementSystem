// columns.tsx
"use client";

import { useState } from "react";
import { User } from "@/app/types/index";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { deleteUser } from "@/service/UserService";

export const getUserColumns = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [open, setOpen] = useState(false);

      const confirmDelete = async () => {
        try {
          const success = await deleteUser(user.userId);
          if (success) {
            setUsers((prev) => prev.filter((u) => u.userId !== user.userId));
          } else {
            alert("Failed to delete user");
          }
          setOpen(false);
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Error deleting user");
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

              <Link href={`/dashboard/users/${user.userId}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
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
                  user.
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
