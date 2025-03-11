import UserTable from '@/app/component/Table/UserTable'
import { Button } from '@heroui/react'
import React from 'react'


const TaskManagement = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex m-5'>
      <Button radius="none" className='bg-[#6256E3]'>Create Task</Button>
    </div>
    <div>
      <UserTable/>
    </div>
</div>
  )
}

export default TaskManagement