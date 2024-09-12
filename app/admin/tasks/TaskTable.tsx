import { DataTable } from '@/app/components/Data-table';
import prisma from '@/prisma/client';
import { columns } from './columns';



const TaskTable = async () => {


  const tasks = await prisma.maintenanceTask.findMany({
    include:
      { rooms: { include: { room: true } } },
    orderBy: { taskId: 'asc' }

  });

  const taskSchedule = await prisma.taskSchedule.findMany({
    where: { status: "PENDING" }
  })

  var data = tasks.map((t: any) => ({ ...t, ...taskSchedule.find(ts => ts.taskId === t.taskId) }));

  return (
    <>
      <DataTable columns={columns} data={data} customCount={data.length} />
    </>
  )
}

export default TaskTable