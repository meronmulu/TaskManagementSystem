import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { deleteUser, getAllUser } from "../../../service/UserService";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";



export default function UserTable() {
  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.users.users || []);
  // console.log(users);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);



  const handleDelete = async (id) => {
      try {
        await dispatch(deleteUser(id)).unwrap();
        console.log("User deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete user. Please try again.");
      }
    
  };
  

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "action",headerName: "Action", width: 150,sortable: false,
      renderCell: (params) => (
        <>
          <Link  to={`/update-user/${params.row.id}`}>
           <IconButton >
            <EditIcon />
           </IconButton>
          </Link>
          

          <IconButton  onClick={()=>handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = users.map((user, index) => ({
    id: user.userId || index + 1,
    fullName: user.name || "N/A",  
    email: user.email || "N/A",
    role: user.role || "User", 
  }));
  
  return (
    <Paper sx={{ height: 400, width: "100%", overflow: "hidden", marginTop: 4 }}>
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
