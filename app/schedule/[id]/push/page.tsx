import prisma from '@/prisma/client';
import TaskActionForm from '../TaskActionForm';

interface Props {
  params: { id: string }
}

const PushSchedulePage = async ({ params: { id } }: Props) => {

  const currentTask =  await prisma.taskSchedule.findFirst({
    where: { scheduleId: parseInt(id) },
    include: {task: true}
  })


  return (
    <div className='p-3'>
     <TaskActionForm operation='PUSH' currentTask={currentTask} id={parseInt(id)} />
    </div>

  )
}

export default PushSchedulePage