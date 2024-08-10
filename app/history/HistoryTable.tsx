import prisma from '@/prisma/client';
import { DataTable } from '../components/Data-table';
import { columns } from './columns';

const HistoryTable = async () => {
    const taskHistory =  await prisma.taskHistory.findMany({
        include: {task: true },
        orderBy: {datePerformed: 'desc'}
    });

  return (
    <div>
        <p>Last 10 completed tasks</p>
        <DataTable columns={columns} data={taskHistory.slice(0,10)} />
        </div>
  )
}

export default HistoryTable