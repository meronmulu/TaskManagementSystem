"use client";

import { Button } from '@heroui/react';
import React from 'react';
import Link from 'next/link';

import UsersTable from '@/app/component/Table/UserTable';


const UserManegment = () => {
  return (
    <div className='flex flex-col'>
      <Link href='/component/form/createUser' className='flex m-5'>
        <Button radius="none" className='bg-[#6256E3] text-white'>Add User</Button>
      </Link>
      <div>
        <UsersTable />
      
      </div>
    </div>
  );
};

export default UserManegment;