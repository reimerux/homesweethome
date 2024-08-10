'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UserForm {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

type Props = {
    currentUser: any,
    id: number
}

const UserForm =  (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<UserForm>();
    return (
        <>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/users/' + props.id, data);
                router.push("/admin/users");
                toast("User updated");
            })
            }>
                <h1>Edit User</h1>
                <div className="mb-5">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="firstName" className="input input-bordered w-full max-w-xs" defaultValue={props.currentUser.firstName} required {...register('firstName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" id="lastName" className="input input-bordered w-full max-w-xs" defaultValue={props.currentUser.lastName} required {...register('lastName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" className="input input-bordered w-full max-w-xs" defaultValue={props.currentUser.email} required {...register('email')} />
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Update</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
            </form>
        </>
    )
}

export default UserForm