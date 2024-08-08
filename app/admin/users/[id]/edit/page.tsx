import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import UserForm from './UserForm';

interface Props {
  params: { id: string }
}

const EditUserPage = async ({ params: { id } }: Props) => {

  const currentUser = await prisma.user.findFirst({
    where: { id: parseInt(id) }
  })
  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3'>
        <UserForm id={parseInt(id)} currentUser={currentUser} />
      </div>
    </div>
  )
}

export default EditUserPage