import { DataTable } from '../components/Data-table'
import Pagination from '../components/Pagination';
import { columns } from './columns'
import prisma from '@/prisma/client';

type Props =
  {
    page: number,
    pagesize: number,
    selection: string;
  }

const IssueGrid = async ({ page, pagesize, selection }: Props) => {

  if (!page) { page = 1 };
  if (!pagesize) { pagesize = 10 };

  const issues = await prisma.issue.findMany({
    orderBy: { created_at: 'desc' },
    where: { ...((selection === "pending") ? { status: "PENDING" } : {}) },
    include: {rooms: {include: {room: true}}}
  });

  const begPage = (page - 1) * pagesize
  const endPage = begPage + pagesize

  return (
    <>
      <DataTable columns={columns} data={issues.slice(begPage, endPage)} customCount={issues.length} />
      <Pagination itemCount={issues.length} pageSize={pagesize} currentPage={page} />
    </>
  )
}

export default IssueGrid

