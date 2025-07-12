"use client";

import { useEffect, useState } from "react";
import { User } from "@/app/types/index";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/users/columns";
import { getAllUsers } from "@/service/UserService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto rounded-xl mt-8 bg-white">
      <div className="mb-4 flex flex-row justify-end p-5 gap-4">
        <Input
          placeholder="Search "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/4 w-1/2 bg-white"
        />
        <Button>
          <Link href="/dashboard/users/create">+ User</Link>
        </Button>
      </div>

      <DataTable columns={getUserColumns(setUsers)} data={filteredUsers} />
    </div>
  );
}
