import React from 'react'
import AdminSideNav from './AdminSideNav'

const AdminPage = () => {
  return (
    <div className='flex'>
        <AdminSideNav/>
        <p className='p-5'>Select a category</p>
    </div>
  )
}

export default AdminPage