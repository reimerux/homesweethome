import prisma from '@/prisma/client';
import { DataTable } from '../components/Data-table';
import { columns } from './columns';

type Props =
  {
    selection: string
  }

const TaskGrid = async ({ selection }: Props) => {

  const taskSchedules = await prisma.taskSchedule.findMany({
    include: { task: {include:{rooms: {include: {room: true}}}}},
    orderBy: { nextDueDate: 'asc' },
    where:  {...((selection === "pending") ? { status: "PENDING" }: {})}
  });

  return (
    <>
      <DataTable columns={columns} data={taskSchedules} customCount={taskSchedules.length}/>
    </>
  )
}

export default TaskGrid

