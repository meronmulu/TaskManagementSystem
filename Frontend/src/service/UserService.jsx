import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../uitility/Axios";
import { removeUser } from "../redux/reducer/UserSlice";

// Fetch All Users
export const getAllUser = createAsyncThunk(
    "users/getAllUsers",
    async (_, ) => {
      try {
        const response = await axiosInstance.get("/all-users");
        // console.log("API Response:", response.data); 
        return response.data;
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        
      }
    }
  );
  

// Register User
export const register = createAsyncThunk("users/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/register", userData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);

        return rejectWithValue(error.response?.data || "Registration failed");
    }
});

// Update User
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, name, email, password, role }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/update/${id}`, { name, email, password, role });
        console.log("Update Response:", response.data);
        return response.data; // Ensure correct return value
      } catch (error) {
        console.error("Update failed:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Update failed");
      }
    }
  );
  
  

// Delete User
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue, dispatch }) => {
      try {
        await axiosInstance.delete(`/delete/${id}`);
        dispatch(removeUser(id)); 
        return id;
      } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Delete failed");
      }
    }
  );
