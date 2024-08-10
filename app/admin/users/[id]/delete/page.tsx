import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import UserDeleteForm from '../UserDeleteForm';

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
        <UserDeleteForm id={parseInt(id)} currentUser={currentUser} />
      </div>
    </div>
  )
}

export default EditUserPage