import instance from "../Axios";
import { User } from "../types/User";

// Fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const res = await instance.get<User[]>("/users/all-users");
    console.log(res.data);
    return res.data; // ✅ Ensure function returns data
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // ✅ Return an empty array to avoid setting undefined in state
  }
};
