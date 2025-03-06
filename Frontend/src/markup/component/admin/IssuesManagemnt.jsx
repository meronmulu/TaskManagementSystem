import React from 'react'
import IssueTable from '../table/IssueTable'

function IssuesManagemnt() {
  return (
    <>
    <div>
      <div className="flex">
       <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-auto">
          Add Issues
       </button>
      </div>
       <IssueTable/>
    </div>
     
    </>
  )
}

export default IssuesManagemnt