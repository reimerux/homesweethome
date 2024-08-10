
import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import TaskDeleteForm from '../TaskDeleteForm';

interface Props {
  params: { id: string }
}

const DeleteUserPage = async ({ params: { id } }: Props) => {

  const currentTask =  await prisma.maintenanceTask.findFirst({
    where: {taskId: parseInt(id)}
})

  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3'>
        <TaskDeleteForm currentTask={currentTask}  id={parseInt(id)} />
      </div>
    </div>
  )
}

export default DeleteUserPage