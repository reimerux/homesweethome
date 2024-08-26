import prisma from '@/prisma/client';
import { Importance, Room, Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import NewIssueForm from './NewIssueForm';

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

  return (
    <div className='p-3'>
      <NewIssueForm allRooms={allRooms} />
    </div>
  )
}

export default NewTaskPage