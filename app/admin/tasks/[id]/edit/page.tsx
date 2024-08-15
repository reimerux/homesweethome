
import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import TaskForm from '../TaskForm';

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic';
const EditUserPage = async ({ params: { id } }: Props) => {

  const currentTask =  await prisma.maintenanceTask.findFirst({
    where: {taskId: parseInt(id)},
    include: {rooms: true}
})
const rooms =  await prisma.room.findMany()

  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3 w-96'>
        <TaskForm currentTask={currentTask} allRooms={rooms} id={parseInt(id)} />
      </div>
    </div>
  )
}

export default EditUserPage