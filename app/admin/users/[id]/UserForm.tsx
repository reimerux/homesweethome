'use client'
import { Role } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UserForm {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
}

type Props = {
    currentUser: any,
    id: number
}

const UserForm =  ({currentUser, id}: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<UserForm>();
    return (
        <>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/users/' + id, data);
                router.push("/admin/users");
                router.refresh();
                toast.success("User updated");
            })
            }>
                <h1>Edit User</h1>
                <div className="mb-5">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                    <input type="text" id="firstName" className="input input-bordered w-full max-w-xs" defaultValue={currentUser.firstName} required {...register('firstName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                    <input type="text" id="lastName" className="input input-bordered w-full max-w-xs" defaultValue={currentUser.lastName} required {...register('lastName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" id="email" className="input input-bordered w-full max-w-xs" defaultValue={currentUser.email} required {...register('email')} />
                </div>
                <div className="mb-5">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                <select id="role" className="select select-bordered w-full max-w-sm" defaultValue={currentUser.role} {...register('role')}>
                        {Object.keys(Role).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Update</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
                <button className="btn btn-ghost" type="button" onClick={() => router.back()}>Back</button>
            </form>
            
        </>
    )
}

export default UserForm