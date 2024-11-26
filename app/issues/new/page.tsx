import { auth } from '@/auth';
import prisma from '@/prisma/client';
import { Importance, Room, Status } from '@prisma/client';
import NewIssueForm from './NewIssueForm';

const NewTaskPage = async () => {
  const allRooms = await prisma.room.findMany();
  const session = await auth();

  return (
    <div className='p-3'>
      <NewIssueForm allRooms={allRooms} userId={session?.user.id} />
    </div>
  )
}

export default NewTaskPage