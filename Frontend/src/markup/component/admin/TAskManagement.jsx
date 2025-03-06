import React from 'react'
import TaskTable from '../table/TaskTable'
function TAskManagement() {
  return (
    <>
    <div>
      <div className="flex">
       <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-auto">
          Add Task
       </button>
      </div>
      <TaskTable/>
    </div>
    
    </>
  )
}

export default TAskManagement