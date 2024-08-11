import prisma from '@/prisma/client';
import TaskActionForm from '../TaskActionForm';

interface Props {
  params: { id: string }
}

const EditSchedulePage = async ({ params: { id } }: Props) => {

  const currentTask =  await prisma.taskSchedule.findFirst({
    where: { scheduleId: parseInt(id) },
    include: { task: {include:{rooms: {include: {room: true}}}}},
  })

  return (
    <div className='p-3'>
     <TaskActionForm operation='COMPLETE' currentTask={currentTask} id={parseInt(id)} />
    </div>

  )
}

export default EditSchedulePage