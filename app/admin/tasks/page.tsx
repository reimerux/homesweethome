import TaskTable from '@/app/admin/tasks/TaskTable'
import React from 'react'
import AdminSideNav from '../AdminSideNav'
import Link from 'next/link'

export const dynamic = 'force-dynamic';
const tasksPage = () => {
  return (
    <div className='flex'>
      <AdminSideNav />
      <div className="flex-col p-3">
        <h1>Maintenance Tasks</h1>
        <div className="mb-5"><Link href="/admin/tasks/new" className='btn btn-sm mr-4'>New Task</Link></div>
        <TaskTable />
        
      </div></div>
  )
}

export default tasksPage