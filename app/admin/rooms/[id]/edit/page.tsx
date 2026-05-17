import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import UserForm from '../RoomForm';

interface Props {
  params: Promise<{ id: string }>
}

const EditUserPage = async ({ params }: Props) => {
  const { id } = await params;

  const currentRoom = await prisma.room.findFirst({
    where: { roomId: parseInt(id) }
  })
  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3'>
        <UserForm id={parseInt(id)} currentRoom={currentRoom} />
      </div>
    </div>
  )
}

export default EditUserPage