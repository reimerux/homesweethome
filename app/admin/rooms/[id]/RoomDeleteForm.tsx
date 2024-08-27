'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface RoomForm {
    houseId: number;
    name: string;
    notes: string;
}

type Props = {
    currentRoom: any,
    id: number
}

const RoomDeleteForm = (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<RoomForm>();
    return (
        <>
            <form className='max-w-lg mx-auto' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.delete('/api/rooms/' + props.id);
                    router.push("/admin/rooms");
                    router.refresh();
                    toast.success("Room deleted");
                } catch (error) {
                    toast.error("Room deletion failed " + error);
                    console.error(error);
                }
            })
            }>
                <h1>Delete User</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" className="input input-bordered w-full max-w-xs" disabled defaultValue={props.currentRoom.name} required {...register('name')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                    <textarea id="notes" className="input input-bordered w-full max-w-xs" disabled defaultValue={props.currentRoom.notes} required {...register('notes')} />
                </div>
                <button className="btn btn-error mr-4" type='submit'>Delete</button>
                <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
            </form>
        </>
    )
}

export default RoomDeleteForm