import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../../../service/UserService';


function UpdateUser() {
  const { id } = useParams();
  const numericId = Number(id);
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const users = useSelector((state)=>state.users.users)
  //  console.log(users)
  const existingUser = users.find((user) => Number(user.id) === numericId);
  if (!existingUser) {
    return <h2>User not found!</h2>;
  }

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [role, setRole] = useState("EMPLOYEE");


   useEffect(()=>{
    if(existingUser){
      setName(existingUser.name);
      setEmail(existingUser.email)
      setPassword(existingUser.password)
      setRole(existingUser.role)

    }
   },[existingUser])

   const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating user:", { id, name, email, password, role });
  
    try {
      await dispatch(updateUser({ id: Number(id), name, email, password, role })).unwrap();
      console.log("User updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user. Please try again.");
    }
  };
  
  

  const handleClick = () =>{
    navigate("/admin")
  }
  return (
    <>
      <div className='p-10 mt-9 '>
        <div className='flex' onClick={handleClick}>
          <ClearIcon className='ml-auto text-blue-600'/>
        </div>
        <div className="flex flex-col items-center justify-center mx-auto w-[1000px] p-10">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Update User</h2>
          <form   onSubmit={handleUpdate}  className="flex flex-col space-y-4" >
          <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b-2 border-blue-500 w-[500px] py-2 rounded-lg focus:outline-none transition"
                />
            </div> 
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 border-blue-500 w-[500px] py-2 rounded-lg focus:outline-none transition"
              />
            </div>
           
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 border-blue-500 w-[500px] py-2 rounded-lg focus:outline-none transition"
              />
            </div>
            
            <div className="flex flex-col">
             <label className="text-gray-600 font-medium mb-1">Role</label>
             <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border-b-2 border-blue-600  py-2 focus:outline-none focus:border-blue-800 transition"
                >
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
           </div>
            

            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mt-4">
              Update
            </button>
          </form>
        </div>

      </div>

      
       
       
    
    </>
  )
}

export default UpdateUser