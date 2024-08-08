import TaskTable from '@/app/admin/tasks/TaskTable'
import React from 'react'
import AdminSideNav from '../AdminSideNav'
import Link from 'next/link'

const tasksPage = () => {
  return (
    <div className='flex'>
    <AdminSideNav/>
  <div className="flex-col p-3">
    <h1>Maintenance Tasks</h1>
  <div className="mb-5"><Link href="/admin/tasks/new" className='btn btn-sm'>New Task</Link></div>
      <TaskTable/>
    </div></div>
  )
}

export default tasksPage