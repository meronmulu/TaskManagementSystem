import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, register, updateUser, deleteUser } from "../../service/UserService";

const UserSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false, error: null },
  reducers: {
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.userId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllUser.fulfilled, (state, action) => {
        // console.log("Fetched Users:", action.payload);
        state.users = Array.isArray(action.payload.data) ? action.payload.data : [];
      })
      
      .addCase(register.fulfilled, (state, action) => {
        console.log("create Users:", action.payload);
        state.users.push(action.payload);
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex((user) => user.userId === action.payload.userId);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload }; 
      }
    })
    
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.userId !== action.payload);
      });
  }
});

export const { removeUser } = UserSlice.actions;
export default UserSlice.reducer;
