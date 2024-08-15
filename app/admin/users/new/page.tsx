'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AdminSideNav from '../../AdminSideNav';
import toast from 'react-hot-toast';
import { Role } from '@prisma/client';

interface UserForm {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
}

 const NewUserPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<UserForm>();

   return (
    <div className='flex'><AdminSideNav/>
    <div className='p-3'>
    <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
      await axios.post('../../api/users',data);
      router.push("/admin/users")
      toast.success("User created")
    })
      }>
      <h1>Create new User</h1>
      <div className="mb-5">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input type="text" id="firstName" className="input input-bordered w-full max-w-xs"  required {...register('firstName')} />
        </div>
        <div className="mb-5">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input type="text" id="lastName" className="input input-bordered w-full max-w-xs" required {...register('lastName')} />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" id="email" className="input input-bordered w-full max-w-xs"  required {...register('email')} />
        </div>
        <div className="mb-5">
        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
          <select id="role" className="select select-bordered w-full max-w-sm" {...register('role')}>
                        {Object.keys(Role).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
        <button className="btn btn-primary mr-4" type='submit'>Create</button>
        <button className="btn btn-ghost" type='reset'>Reset</button>
        <button className="btn btn-ghost" type="button" onClick={() => router.back()}>Back</button>
     </form>
     </div>
     </div>
   )
 }

 export default NewUserPage