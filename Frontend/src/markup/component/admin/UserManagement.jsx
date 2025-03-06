import React from 'react'
import UserTable from '../table/UserTable'
import { Link } from 'react-router-dom'
function UserManagement() {
  return (
    <>
    <div>
    <div className="flex">
       <Link  to={"/create-user"} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-auto">
          Add User
       </Link>
    </div>
    <UserTable />
    
    </div>
    </>
  )
}

export default UserManagement