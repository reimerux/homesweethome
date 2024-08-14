import { DataTable } from '../components/Data-table'
import Pagination from '../components/Pagination';
import { columns } from './columns'
import prisma from '@/prisma/client';

type Props =
  {
    page: number,
    pagesize: number,
    selection: string
  }

const TaskGrid = async ({ page, pagesize,selection }: Props) => {

  if (!page)  {page=1};
  if (!pagesize)  {pagesize=10};
  const taskSchedules = await prisma.taskSchedule.findMany({
    include: { task: {include:{rooms: {include: {room: true}}}}},
    orderBy: { nextDueDate: 'asc' },
    where:  {...((selection === "pending") ? { status: "PENDING" }: {})}
  });

  const begPage = (page - 1) * pagesize
  const endPage = begPage + pagesize

  return (
    <>
      <DataTable columns={columns} data={taskSchedules.slice(begPage, endPage)} customCount={taskSchedules.length}/>
      <Pagination itemCount={taskSchedules.length} pageSize={pagesize} currentPage={page} />
    </>
  )
}

export default TaskGrid

