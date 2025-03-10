import React from 'react'
import Table from '../../../component/Table'
import { Button } from '@heroui/react'

const ProjectManegment = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex m-5'>
      <Button radius="none" className='bg-[#6256E3]'>Add Project</Button>
    </div>
    <div>
      <Table/>
    </div>
</div>
  )
}

export default ProjectManegment