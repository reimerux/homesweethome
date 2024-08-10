import Link from 'next/link'
import React from 'react'

const AdminSideNav = () => {
  return (
    <>
      <div className='flex-col bg-slate-100 p-5'>
        <p className='mb-10 font-semibold'>Settings</p>
        <p className='mb-6'><Link href="/admin/users/">Users</Link></p>
        <Link href="/admin/tasks?page=1&pagesize=10">Tasks</Link>
      </div>
    </>
  )
}

export default AdminSideNav