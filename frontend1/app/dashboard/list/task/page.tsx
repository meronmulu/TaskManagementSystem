import { Button } from '@heroui/react'
import React from 'react'
import Table from '../../../component/Table'

const TaskManagement = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex m-5'>
      <Button radius="none" className='bg-[#6256E3]'>Create Task</Button>
    </div>
    <div>
      <Table/>
    </div>
</div>
  )
}

export default TaskManagement