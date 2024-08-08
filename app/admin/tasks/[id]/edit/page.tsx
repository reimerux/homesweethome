
import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import TaskForm from './TaskForm';

interface Props {
  params: { id: string }
}

const EditUserPage = async ({ params: { id } }: Props) => {

  const currentTask =  await prisma.maintenanceTask.findFirst({
    where: {taskId: parseInt(id)}
})

  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3'>
        <TaskForm currentTask={currentTask} id={parseInt(id)} />
      </div>
    </div>
  )
}

export default EditUserPage