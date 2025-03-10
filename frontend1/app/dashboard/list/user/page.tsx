"use client "
import { Button} from '@heroui/react'
import React from 'react'
import Table from '../../../component/Table'
import Link from 'next/link'
import UsersTable from '@/app/component/Table/UserTable'
// import gg  from '../../../component/form/user'

const UserManegment = () => {
  return (
    <div className='flex flex-col'>
        <Link href='/components/form/user' className='flex m-5'>
          <Button radius="none" className='bg-[#6256E3]'>Add User</Button>
        </Link>
        <div>
          <UsersTable/>
        </div>
    </div>
  )
}

export default UserManegment