'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface RoomForm {
    roomId: number;
    name: string;
    notes: string;
}

type Props = {
    currentRoom: any,
    id: number
}

const RoomForm =  (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<RoomForm>();
    return (
        <>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/rooms/' + props.id, data);
                router.push("/admin/rooms");
                toast("Room updated");
            })
            }>
                <h1>Edit Room</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" className="input input-bordered w-full max-w-xs" defaultValue={props.currentRoom.name} required {...register('name')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                    <textarea id="notes" className="input input-bordered w-full max-w-xs" defaultValue={props.currentRoom.notes} required {...register('notes')} />
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Update</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
            </form>
        </>
    )
}

export default RoomForm