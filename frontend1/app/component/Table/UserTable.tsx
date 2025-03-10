"use client";
import { useEffect, useState } from "react";
import CustomTable from "../Table";
import { Tooltip } from "@heroui/react";
import { User } from "../../types/User";
import { getAllUsers } from "../../services/UserServices";

const userColumns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "PASSWORD", uid: "password"},
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
];

export default function UsersTable (){  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data)
        if (data) setUsers(data);
        console.log("Users state after update:", data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const renderUserCell = (user: User, columnKey: keyof User) => {
    if (!user[columnKey]) return "N/A"; // ✅ Handle missing data gracefully
  
    switch (columnKey) {
      case "name":
        return <span>{user.name}</span>;
      case "email":
        return <span>{user.email}</span>;
      case "password":
        return <span>******</span>;  // ✅ Hide passwords for security
      case "role":
        return <span>{user.role}</span>;
      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="Edit">
              <button className="text-blue-500">✏️</button>
            </Tooltip>
            <Tooltip content="Delete">
              <button className="text-red-500">🗑️</button>
            </Tooltip>
          </div>
        );
      default:
        return "N/A";
    }
  };
  

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <CustomTable columns={userColumns} items={users} renderCell={renderUserCell} />;
}
