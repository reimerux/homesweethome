
import prisma from '@/prisma/client';
import IssueForm from '../IssueForm';
import { auth } from '@/auth';

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic';
const EditUserPage = async ({ params: { id } }: Props) => {

  const currentIssue =  await prisma.issue.findFirst({
    where: {issueId: parseInt(id)},
    include: {rooms: true}
})
const allRooms =  await prisma.room.findMany()
const session = await auth();

  return (
    
      <div className='p-3'>
        <IssueForm currentIssue={currentIssue} allRooms={allRooms} id={parseInt(id)} userId={session?.user.id}/>
      </div>

  )
}

export default EditUserPage