
import prisma from '@/prisma/client';
import InventoryNewForm from './InventoryNewForm';




const NewInventoryPage = async () => {
  
  const allRooms = await prisma.room.findMany();

  return (

    <div className='p-3'>

      <InventoryNewForm allRooms={allRooms}/>
    </div>

  )
}

export default NewInventoryPage