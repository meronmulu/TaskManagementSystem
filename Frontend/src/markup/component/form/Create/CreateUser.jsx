import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../../../service/UserService';

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const handleClick = () =>{
    navigate("/admin");

 
  }
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({name,email,password,role})).unwarp();
       setName("");
       setEmail("");
       setPassword("");
       navigate("/admin")
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className='p-10 mt-9'>
        <div className='flex' onClick={handleClick}>
          <ClearIcon className='ml-auto text-blue-600'/>
        </div>
        <div className="flex flex-col items-center justify-center mx-auto w-[1000px] p-10">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Add User</h2>
          <form   onSubmit={handleSubmit}  className="flex flex-col space-y-4" >
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
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
           </div>
            

            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mt-4">
              Submit
            </button>
          </form>
        </div>

      </div>

      
       
       
    
    </>
  )
}

export default CreateUser