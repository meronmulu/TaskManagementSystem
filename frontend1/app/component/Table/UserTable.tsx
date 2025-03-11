"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers } from "@/app/services/UserServices";
import { User } from "@/app/types/User";
import Link from "next/link";


export default function UserTable() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log("Fetched users:", response); 
        setUsers(response.data); 
      
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };
  

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: any) => (
        <div>
          <Link href="/component/form/updateUser">
            <EditIcon />
          </Link>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // Ensure `users` is an array before calling `.map()`
  const rows = Array.isArray(users)
    ? users.map((user: User, index) => ({
        id: user.userId || index + 1,
        fullName: user.name || "N/A",
        email: user.email || "N/A",
        role: user.role || "User",
      }))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
