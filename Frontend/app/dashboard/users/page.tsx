"use client";

import { useEffect, useState } from "react";
import { User } from "@/app/types/index";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/users/columns"; // <-- updated import
import { getAllUsers } from "@/service/UserService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await getAllUsers();
          console.log(res)
          setUsers(res);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchUsers();
    }, []);


  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 mr-4 flex justify-end">
        <Button>
          <Link href="/dashboard/users/create">+ User</Link>
        </Button>
      </div>
      <DataTable columns={getUserColumns(setUsers)} data={users} />
    </div>
  );
}
