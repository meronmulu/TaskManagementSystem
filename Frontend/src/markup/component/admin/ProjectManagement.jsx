import React from 'react'
import ProjectTable from '../table/ProjectTable'

function ProjectManagement() {
  return (
    <>
    <div>
    <div className="flex">
       <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-auto">
          Add Project
       </button>
    </div>
      <ProjectTable/>
    </div>
      
    </>
  )
}

export default ProjectManagement