import { DataTable } from '../components/Data-table'
import { columns } from './columns'
import prisma from '@/prisma/client';

interface taskSchedule {
  scheduleId: number;
  task: {
      taskName: string;
      description: string;
      importance: string;
  }
  nextDueDate: Date;
  status: string;
}

const AllTaskGrid = async () => {
     
    const taskSchedules =  await prisma.taskSchedule.findMany({
      include: {task: true },
      orderBy: {nextDueDate: 'asc'}
  });

  
  return (
    <DataTable columns={columns} data={taskSchedules} />
  )
}

export default AllTaskGrid

