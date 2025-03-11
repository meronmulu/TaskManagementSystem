import instance from "../Axios";
import { User } from "../types/User";

// Fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const res = await instance.get<User[]>("/users/all-users");
    console.log(res.data);
    return res.data; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
};

export const register = async (): Promise<User> =>{
  try {
    const res = await instance.post("/users/register");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
