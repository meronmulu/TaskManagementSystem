import { Button } from '@heroui/react'
import React from 'react'
import Table from '../../../component/Table'

const IssueManagment = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex m-5'>
          <Button radius="none" className='bg-[#6256E3]'>Add issue</Button>
        </div>
        <div>
          <Table/>
        </div>
    </div>
  )
}

export default IssueManagment