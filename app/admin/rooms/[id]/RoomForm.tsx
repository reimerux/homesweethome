'use client'
import FormButtons from '@/app/components/FormButtons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface RoomForm {
    roomId: number;
    name: string;
    shortName: string | null;
    notes: string;
}

type Props = {
    currentRoom: any,
    id: number
}

const RoomForm = (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<RoomForm>();
    return (
        <>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.put('/api/rooms/' + props.id, data);
                    router.push("/admin/rooms");
                    router.refresh();
                    toast.success("Room updated");
                } catch (error) {
                    toast.error("Room update failed " + error);
                    console.error(error);
                }
            })
            }>
                <h1>Edit Room</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" className="input input-bordered w-full max-w-xs" defaultValue={props.currentRoom.name} required {...register('name')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Name</label>
                    <input type="text" id="shortName" className="input input-bordered w-full max-w-xs" defaultValue={props.currentRoom.shortName} required {...register('shortName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                    <textarea id="notes" className="input input-bordered w-full max-w-xs" defaultValue={props.currentRoom.notes}  {...register('notes')} />
                </div>
                <FormButtons isSubmitting={false} SubmitText="Change" />
            </form>
        </>
    )
}

export default RoomForm