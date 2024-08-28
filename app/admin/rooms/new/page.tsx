'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AdminSideNav from '../../AdminSideNav';
import toast from 'react-hot-toast';
import FormButtons from '@/app/components/FormButtons';

interface RoomForm {
  roomId: number;
  name: string;
  shortName: string | null;
  notes: string;
}
const NewRoomPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<RoomForm>();

  return (
    <div className='flex'><AdminSideNav />
      <div className='p-3'>
        <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('../../api/rooms', data);
            router.push("/admin/rooms");
            router.refresh();
            toast.success("Room created")
          } catch (error) {
            toast.error("Room creation failed " + error);
            console.error(error);
          }
        })
        }>
          <h1>Create new Room</h1>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name" className="input input-bordered w-full max-w-xs" required {...register('name')} />
          </div>
          <div className="mb-5">
            <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Name</label>
            <input type="text" id="shortName" className="input input-bordered w-full max-w-xs" required {...register('shortName')} />
          </div>
          <div className="mb-5">
            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
            <textarea id="notes" className="input input-bordered w-full max-w-xs" {...register('notes')} />
          </div>
          <FormButtons isSubmitting={false} SubmitText="Create" />
        </form>
      </div>
    </div>
  )
}

export default NewRoomPage