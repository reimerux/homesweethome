import Link from 'next/link';
import AdminSideNav from '../AdminSideNav';
import UserTable from './RoomTable';


export const dynamic = 'force-dynamic';
const RoomsPage = () => {

  return (
    <div className='flex'>
      <AdminSideNav />
      <div className="flex-col p-3">
        <h1>Rooms</h1>
        <div className='mb-5'><Link className="btn btn-sm" href="/admin/rooms/new" >New Room</Link></div>
        <UserTable />
      </div>
    </div>
  )
}

export default RoomsPage