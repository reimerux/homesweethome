'use client'
import ImportancePicker from '@/app/components/ImportancePicker';
import RoomMultiSelect from '@/app/components/RoomMultiSelect';
import { Importance, Status } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IssueForm {
    issueId: number; title: string; description: string | null;
    created_at: Date;
    updated_at: Date;
    status: Status;
    priority: Importance;
    notes: string | null;
    rooms: Array<number>
}

type Props = {
    currentIssue: any,
    id: number, allRooms: any
}

const IssueForm = ({ currentIssue, id, allRooms }: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<IssueForm>();    

    return (
        <>
        
            <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/issues/' + id, data);
                router.push("/issues/pending?page=1&pagesize=10");
                router.refresh();
                toast.success("Issue " + id + " updated");
            })
            }>
                <h1>Edit Issue {currentIssue.issueId}</h1>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="title" className='input input-bordered w-full' placeholder="Task Name" defaultValue={currentIssue.title} {...register('title')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" defaultValue={currentIssue.description}{...register('description')} />
                </div>
                <div className="mb-5 max-w-sm">
                   <ImportancePicker defaultValue={currentIssue.priority} register={register("priority", { setValueAs: v => Object.values(Importance)[2-v], })}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                    <select id="status" className="select select-bordered w-full max-w-sm" defaultValue={currentIssue.status} {...register('status')}>
                        {Object.keys(Status).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5 max-w-sm">
                    {/* {JSON.stringify(currentIssue.rooms)} */}
                    <RoomMultiSelect register={register("rooms")} allRooms={allRooms} roomsSelected={currentIssue.rooms.map((room: any) => room.roomId.toString())}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 ">Notes</label>
                    <textarea className="textarea textarea-bordered w-full" id="notes" placeholder="Notes" {...register('notes')} />
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Change</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
                <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
            </form>
        </>
    )
}

export default IssueForm