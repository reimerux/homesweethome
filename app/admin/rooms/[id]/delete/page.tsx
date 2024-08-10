import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import RoomDeleteForm from '../RoomDeleteForm';

interface Props {
  params: { id: string }
}

const EditRoomPage = async ({ params: { id } }: Props) => {

  const currentRoom = await prisma.room.findFirst({
    where: { roomId: parseInt(id) }
  })
  return (
    <div className='flex'>
      <AdminSideNav />
      <div className='p-3'>
        <RoomDeleteForm id={parseInt(id)} currentRoom={currentRoom} />
      </div>
    </div>
  )
}

export default EditRoomPage