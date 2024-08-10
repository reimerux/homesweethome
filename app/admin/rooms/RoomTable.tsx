import prisma from '@/prisma/client';
import { columns } from './columns';
import { DataTable } from '@/app/components/Data-table';


const RoomTable = async () => {
  
  const rooms = await prisma.room.findMany();

  return (
    <>
      <DataTable columns={columns} data={rooms} />
    </>
  )
}

export default RoomTable