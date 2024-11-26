import prisma from '@/prisma/client';
import { auth } from '@/auth';
import InventoryDeleteForm from '../InventoryDeleteForm';

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic';
const DeleteInventoryPage = async ({ params: { id } }: Props) => {

  const currentItem =  await prisma.inventory.findFirst({
    where: {invId: parseInt(id)},
    include: {rooms: true}
})
    const allRooms =  await prisma.room.findMany()
    const session = await auth();

  return (
    
      <div className='p-3'>
        <InventoryDeleteForm currentItem={currentItem} id={parseInt(id)} />
      </div>

  )
}

export default DeleteInventoryPage