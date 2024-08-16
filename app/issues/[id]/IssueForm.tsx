'use client'
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
    priority: Importance
}

type Props = {
    currentIssue: any,
    id: number
}

const TaskForm = ({ currentIssue, id }: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<IssueForm>();

    const PriorityMap = [{ "id": 0, "Importance": "LOW" }, { "id": 1, "Importance": "MEDIUM" }, { "id": 2, "Importance": "HIGH" }]

    return (
        <>
            <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/issues/' + id, data);
                router.push("/issues/pending?page=1&pagesize=10");
                router.refresh();
                toast.success("Issue " + id + " updated");
            })
            }>
                <h1>Edit Issue</h1>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="title" className='input input-bordered w-full' placeholder="Task Name" defaultValue={currentIssue.title} {...register('title')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" defaultValue={currentIssue.description}{...register('description')} />
                </div>
                <div className="mb-5 max-w-sm">
                    <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
                    <input id="importance" type="range" min={0} max="2" defaultValue={PriorityMap.find(o => o.Importance ===currentIssue.priority)?.id} className="range" step="1" {...register("priority", { setValueAs: v => PriorityMap[v].Importance, })} />
                    <div className="flex w-full justify-between px-2 text-xs">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                    <select id="status" className="select select-bordered w-full max-w-sm" defaultValue={currentIssue.status} {...register('status')}>
                        {Object.keys(Status).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Change</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
                <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
            </form>
        </>
    )
}

export default TaskForm