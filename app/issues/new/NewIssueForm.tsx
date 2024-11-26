'use client'
import FormButtons from '@/app/components/FormButtons';
import ImportancePicker from '@/app/components/ImportancePicker';
import RoomMultiSelect from '@/app/components/RoomMultiSelect';
import { Importance, Status } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IssueForm {
    issueId: number; title: string; description: string | null;
    created_at: Date;
    updated_at: Date;
    status: Status;
    createdBy: number;
    priority: Importance;
    notes: string | null;
    rooms: Array<number>
}

type Props = {
    allRooms: any
    userId: string | undefined
}

const NewIssueForm = ({ allRooms , userId}: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const { register, handleSubmit } = useForm<IssueForm>();

    return (
        <>

            <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
                setIsSubmitting(true);
                
                const newissue = await axios.post('../../api/issues', data);
                router.push("/issues/pending");
                router.refresh();
                toast.success("New Issue " + newissue.data.issueId + " - '" + newissue.data.title.substring(0, 15) + "' created");
            })
            }>
                <h1>New Issue </h1>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="title" className='input input-bordered w-full' placeholder="Task Name"  {...register('title')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" {...register('description')} />
                </div>
                <div className="mb-5 max-w-sm">
                    <ImportancePicker defaultValue={"LOW"} register={register("priority", { setValueAs: v => Object.values(Importance)[2 - v], })} />
                </div>
                <div className="mb-5 max-w-sm">
                    <RoomMultiSelect register={register("rooms")} allRooms={allRooms} roomsSelected={[]}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 ">Notes</label>
                    <textarea className="textarea textarea-bordered w-full" id="notes" placeholder="Notes" {...register('notes')} />
                </div>
                <input id="status" className="hidden" defaultValue={"PENDING"} {...register('status')} />
                <input id="status" className="hidden" defaultValue={(!userId)? "1":userId} {...register('createdBy')} />

                <FormButtons isSubmitting={isSubmitting} SubmitText="Create" />
            </form>
        </>
    )
}

export default NewIssueForm