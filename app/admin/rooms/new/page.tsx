'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AdminSideNav from '../../AdminSideNav';
import toast from 'react-hot-toast';

interface RoomForm {
  roomId: number;
  name: string;
  shortName: string | null;
  notes: string;
}
 const NewRoomPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<RoomForm>();

   return (
    <div className='flex'><AdminSideNav/>
    <div className='p-3'>
    <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
      await axios.post('../../api/rooms',data);
      router.push("/admin/rooms");
      router.refresh();
      toast.success("Room created")
    })
      }>
      <h1>Create new Room</h1>
      <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="name" className="input input-bordered w-full max-w-xs"  required {...register('name')} />
        </div>
        <div className="mb-5">
                    <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Name</label>
                    <input type="text" id="shortName" className="input input-bordered w-full max-w-xs" required {...register('shortName')} />
                </div>
        <div className="mb-5">
          <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
          <textarea  id="notes" className="input input-bordered w-full max-w-xs" {...register('notes')} />
        </div>

        <button className="btn btn-primary mr-4" type='submit'>Create</button>
        <button className="btn btn-ghost" type='reset'>Reset</button>
     </form>
     </div>
     </div>
   )
 }

 export default NewRoomPage