import prisma from '@/prisma/client';
import { columns } from './columns';
import { DataTable } from '@/app/components/Data-table';


const UserTable = async () => {
  
  const users = await prisma.user.findMany();

  return (
    <>
      <DataTable columns={columns} data={users} />
    </>
  )
}

export default UserTable