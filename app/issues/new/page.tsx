import prisma from '@/prisma/client';
import { Importance, Room, Status } from '@prisma/client';
import NewIssueForm from './NewIssueForm';
import { auth } from '@/auth';
import { devNull } from 'node:os';

interface IssueForm {
  issueId: number; title: string; description: string | null;
  created_at: Date;
  updated_at: Date;
  status: Status;
  priority: Importance;
  rooms: Array<Room>;
}

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