import { DataTable } from '@/app/components/Data-table';
import prisma from '@/prisma/client';
import { columns } from './columns';


const TaskTable = async () => {
    const tasks =  await prisma.maintenanceTask.findMany(); 
    return (
        <>         
            <DataTable columns={columns} data={tasks} />
        </>
    )
}

export default TaskTable