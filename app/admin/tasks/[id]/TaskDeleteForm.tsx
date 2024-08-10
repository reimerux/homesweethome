'use client'
import { Frequency, Importance, Season } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface TaskForm {
    taskName: string;
    description: string;
    importance: Importance;
    frequency: Frequency;
    season: Season;
}

type Props = {
    currentTask: any,
    id: number,
}

const TaskForm = (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<TaskForm>();
    return (
        <>
            <form className='max-w-m mx-auto' onSubmit={handleSubmit(async (data) => {

                    await axios.delete('/api/tasks/' + props.id);
                    router.push("/admin/tasks");
                    toast("Task deleted");

            })
            }>
                <h1>Delete Task</h1>
                <div className="mb-5">
                    <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                    <input type="text" id="taskName" className='input input-bordered w-full max-w-xs' disabled placeholder="Task Name" defaultValue={props.currentTask.taskName} {...register('taskName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" disabled placeholder="Description" defaultValue={props.currentTask.description}{...register('description')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <select id="importance" className="select select-bordered w-full max-w-sm" disabled defaultValue={props.currentTask.importance} {...register('importance')} >
                        {Object.keys(Importance).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <select id="frequency" className="select select-bordered w-full max-w-sm" disabled defaultValue={props.currentTask.frequency} {...register('frequency')}>
                        {Object.keys(Frequency).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="season" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suggested Season</label>
                    <select id="season" className="select select-bordered w-full max-w-sm" disabled defaultValue={props.currentTask.season} {...register('season')}>
                        {Object.keys(Season).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <button className="btn btn-error mr-4" type='submit'>Delete</button>
            </form>
        </>
    )
}

export default TaskForm