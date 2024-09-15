import prisma from '@/prisma/client';
import { DataTable } from '@/app/components/Data-table';
import { columns } from './columns';

const HistoryIssueTable = async () => {
    const issueHistory = await prisma.issue.findMany({
        where: {status: "COMPLETED"},
        orderBy: { completedAt: 'desc' }
    });

    return (
        <>
            
            <DataTable columns={columns} data={issueHistory.slice(0, 10)} />
        </>
    )
}

export default HistoryIssueTable