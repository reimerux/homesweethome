import React from 'react'
import AdminSideNav from './AdminSideNav'

export const dynamic = 'force-dynamic';
const AdminPage = () => {
  return (
    <div className='flex'>
        <AdminSideNav/>
        <p className='p-5'>Select a category from the sideNav</p>
    </div>
  )
}

export default AdminPage