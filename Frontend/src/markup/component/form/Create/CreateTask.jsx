import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
function CreateTask() {
  return (
    <>
      <div className='p-10 mt-9 '>
        <div className='flex'>
          <ClearIcon className='ml-auto text-blue-600'/>
        </div>
        <div className="flex flex-col items-center justify-center mx-auto w-[1000px] p-10">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Add User</h2>
          <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter your title"
                className="border-b-2 border-blue-500 w-[500px] py-2 rounded-lg focus:outline-none transition"
                />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Description</label>
              <textarea
               placeholder="Enter description"
               className="border-b-2 border-blue-500 w-[500px] py-2 rounded-lg focus:outline-none transition"
             ></textarea>
            </div>
            
            <div className="flex flex-col">
             <label className="text-gray-600 font-medium mb-1">Status</label>
             <select className="border-b-2 border-blue-600  py-2 focus:outline-none focus:border-blue-800 transition">
              <option value="pending">PENDING</option>
              <option value="in-progress">IN_PROGRESS</option>
              <option value="completed">COMPLETED</option>
            </select>
           </div>
           <div className="flex flex-col">
             <label className="text-gray-600 font-medium mb-1">Priority</label>
             <select className="border-b-2 border-blue-600  py-2 focus:outline-none focus:border-blue-800 transition">
              <option value="low">LOW</option>
              <option value="medium">MEDIUM</option> 
              <option value="high">HIGH</option>
              <option value="urgent">URGENT</option>
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

export default CreateTask