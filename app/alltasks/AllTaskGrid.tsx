import { DataTable } from '../components/Data-table'
import Pagination from '../components/Pagination';
import { columns } from './columns'
import prisma from '@/prisma/client';

type Props =
  {
    page: number,
    pagesize: number
  }

const AllTaskGrid = async ({ page, pagesize }: Props) => {

  const taskSchedules = await prisma.taskSchedule.findMany({
    include: { task: true },
    orderBy: { nextDueDate: 'asc' }
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

export default AllTaskGrid

