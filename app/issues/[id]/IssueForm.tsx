'use client'
import { Frequency, Importance, Season, Status } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IssueForm {
    issueId: number; title: string; description: string | null;
    created_at:  Date;
    updated_at:  Date;
    status:      Status;
    priority:    Importance
}

type Props = {
    currentIssue: any,
    id: number
}

const TaskForm = ({currentIssue,  id}: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<IssueForm>();
  
    return (
        <>
            <form className='' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/issues/' + id, data);
                router.push("/issues/pending?page=1&pagesize=10");
                router.refresh();
                toast.success("Issue " + id +" updated");
                
            })
            }>
                <h1>Edit Issue</h1>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" className='input input-bordered w-full' placeholder="Task Name" defaultValue={currentIssue.title} {...register('title')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" defaultValue={currentIssue.description}{...register('description')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                    <select id="priority" className="select select-bordered w-full max-w-sm" defaultValue={currentIssue.priority} {...register('priority')}>
                        {Object.keys(Importance).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">status</label>
                    <select id="status" className="select select-bordered w-full max-w-sm" defaultValue={currentIssue.status} {...register('status')}>
                        {Object.keys(Status).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Change</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
            </form>
        </>
    )
}

export default TaskForm