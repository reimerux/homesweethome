import prisma from '@/prisma/client';
import { DataTable } from '../components/Data-table';
import { columns } from './columns';

type Props =
  {
    selection: string;
  }

const IssueGrid = async ({  selection }: Props) => {



  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    where: { ...((selection === "pending") ? { status: "PENDING" } : {}) },
    include: {rooms: {include: {room: true}}}
  });


  return (
    <>
      <DataTable columns={columns} data={issues} customCount={issues.length} /> 
    </>
  )
}

export default IssueGrid

