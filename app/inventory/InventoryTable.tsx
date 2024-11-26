import prisma from '@/prisma/client';
import { columns } from './columns';
import { DataTable } from '@/app/components/Data-table';


const InventoryTable = async () => {
  
  const inventory = await prisma.inventory.findMany({include:{rooms: {include: {room: true}}}});

  return (
    <>
      <DataTable columns={columns} data={inventory} />
    </>
  )
}

export default InventoryTable