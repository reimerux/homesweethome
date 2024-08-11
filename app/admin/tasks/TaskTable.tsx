import { DataTable } from '@/app/components/Data-table';
import prisma from '@/prisma/client';
import { columns } from './columns';
import Pagination from '@/app/components/Pagination';

type Props =
  {
    page: number,
    pagesize: number
  }

const TaskTable = async ({ page, pagesize }: Props) => {
    const tasks =  await prisma.maintenanceTask.findMany(
        {include:{rooms: {include: {room: true}}}}
    ); 

    const begPage = (page - 1) * pagesize
    const endPage = begPage + pagesize

    return (
        <>         
            <DataTable columns={columns} data={tasks.slice(begPage, endPage)} customCount={tasks.length}/>
            <Pagination itemCount={tasks.length} pageSize={pagesize} currentPage={page} />
        </>
    )
}

export default TaskTable