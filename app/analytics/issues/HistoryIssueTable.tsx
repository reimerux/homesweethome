import prisma from '@/prisma/client';
import { DataTable } from '@/app/components/Data-table';
import { columns } from './columns';

const HistoryIssueTable = async () => {
    const issueHistory = await prisma.issue.findMany({
        where: {status: "COMPLETED"},
        orderBy: { completedAt: 'desc' }
    });

    return (
        <div>
            <p>Last 10 completed tasks</p>
            <DataTable columns={columns} data={issueHistory.slice(0, 10)} />
        </div>
    )
}

export default HistoryIssueTable