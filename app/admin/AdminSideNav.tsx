import Link from 'next/link'
import { env } from 'process'
import React from 'react'

const AdminSideNav = () => {
  return (
    <>
      <div className='flex-col bg-slate-400 gap-2 p-2 min-w-40'>
        <p className='mb-10 font-bold'>Settings</p>
        <p className='mb-6 link-hover'><Link href="/admin/users/">Users</Link></p>
        <p className='mb-6 link-hover'><Link href="/admin/tasks?page=1&pagesize=10">Tasks</Link></p>
        <p className='mb-6 link-hover'><Link href="/admin/home">Home</Link></p>
        <p className='mb-6 link-hover'><Link href="/admin/rooms">Rooms</Link></p>
        <p className='text-sm'>Version {env.REACT_APP_VERSION}</p>
      </div>
    </>
  )
}

export default AdminSideNav