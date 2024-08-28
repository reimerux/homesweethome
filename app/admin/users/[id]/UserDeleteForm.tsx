'use client'
import FormButtons from '@/app/components/FormButtons';
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

const UserDeleteForm =  (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<UserForm>();
    return (
        <>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.delete('/api/users/' + props.id);
                router.push("/admin/users", );
                toast.success("User deleted");
            })
            }>
                <h1>Delete User</h1>
                <div className="mb-5">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="firstName" className="input input-bordered w-full max-w-xs" disabled defaultValue={props.currentUser.firstName} required {...register('firstName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" id="lastName" className="input input-bordered w-full max-w-xs" disabled  defaultValue={props.currentUser.lastName} required {...register('lastName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" className="input input-bordered w-full max-w-xs" disabled defaultValue={props.currentUser.email} required {...register('email')} />
                </div>
                <FormButtons isSubmitting={false} SubmitText="Delete" />
            </form>
        </>
    )
}

export default UserDeleteForm