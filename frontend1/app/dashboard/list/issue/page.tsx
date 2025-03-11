import { Button } from '@heroui/react'
import React from 'react'

import UserTable from '@/app/component/Table/UserTable'

const IssueManagment = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex m-5'>
          <Button radius="none" className='bg-[#6256E3]'>Add issue</Button>
        </div>
        <div>
          <UserTable/>
        </div>
    </div>
  )
}

export default IssueManagment