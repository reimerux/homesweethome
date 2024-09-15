import prisma from '@/prisma/client';
import { DataTable } from '@/app/components/Data-table';
import { columns } from './columns';

const HistoryTaskTable = async () => {
    const taskHistory = await prisma.taskHistory.findMany({
        include: { task: true },
        orderBy: { datePerformed: 'desc' }
    });

    return (
        <>
            <DataTable columns={columns} data={taskHistory.slice(0, 10)} />
        </>
    )
}

export default HistoryTaskTable