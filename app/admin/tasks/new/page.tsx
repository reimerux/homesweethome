import prisma from '@/prisma/client';
import AdminSideNav from '../../AdminSideNav';
import NewTaskForm from './NewTaskForm';


 const NewTaskPage = async () => {
  const allRooms =  await prisma.room.findMany()
   return (
    <div className='flex'><AdminSideNav/>
    <div className='p-3'>
      <NewTaskForm allRooms={allRooms} />
     </div>
     </div>
   )
 }

 export default NewTaskPage