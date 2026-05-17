
import AdminSideNav from '@/app/admin/AdminSideNav';
import prisma from '@/prisma/client';
import HomeForm from './HomeForm';

const EditHomePage = async () => {

  const home =  await prisma.house.findFirst({
    where: {houseId: 1}
})

  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3'>
        <HomeForm home={home} id={1} />
      </div>
    </div>
  )
}

export default EditHomePage