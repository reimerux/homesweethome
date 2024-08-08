import Link from 'next/link';
import AdminSideNav from '../AdminSideNav';
import UserTable from './UserTable';


const UsersPage = () => {

  return (
    <div className='flex'>
      <AdminSideNav />
      <div className="flex-col p-3">
        <h1>Users</h1>
        <div className='mb-5'><Link className="btn btn-sm" href="/admin/users/new" >New User</Link></div>
        <UserTable />
      </div>
    </div>
  )
}

export default UsersPage