import prisma from '@/prisma/client';
import { auth } from '@/auth';
import InventoryForm from '../InventoryForm';

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic';
const EditInventoryPage = async ({ params: { id } }: Props) => {

  const currentItem =  await prisma.inventory.findFirst({
    where: {invId: parseInt(id)},
    include: {rooms: {include: {room: true}}}
})
const allRooms =  await prisma.room.findMany()
const session = await auth();

  return (
    
      <div className='p-3'>
        <InventoryForm currentItem={currentItem} allRooms={allRooms} id={parseInt(id)} userId={session?.user.id} username={session?.user.name}/>
      </div>

  )
}

export default EditInventoryPage