
import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import IssueForm from '../IssueForm';

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic';
const EditUserPage = async ({ params: { id } }: Props) => {

  const currentIssue =  await prisma.issue.findFirst({
    where: {issueId: parseInt(id)}
})
const rooms =  await prisma.room.findMany()

  return (
    
      <div className='p-3'>
        <IssueForm currentIssue={currentIssue} id={parseInt(id)} />
      </div>

  )
}

export default EditUserPage