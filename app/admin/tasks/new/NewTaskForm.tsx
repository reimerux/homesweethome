'use client'
import RoomMultiSelect from '@/app/components/RoomMultiSelect';
import { Frequency, Importance, Season } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface TaskForm {
    taskName: string;
    description: string;
    importance: Importance;
    frequency: Frequency;
    season: Season;
    timeEstimate: number;
    rooms: Array<number>;
}

type Props = {
    allRooms: any
}


const NewTaskForm = ({ allRooms }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { register, handleSubmit } = useForm<TaskForm>();

    return (
        <>
            <form className='' onSubmit={handleSubmit(async (data) => {
                try {
                    setIsSubmitting(true);
                    await axios.post('../../api/tasks', data);
                    toast.success("Task created");
                    router.push("/admin/tasks");
                    router.refresh();
                } catch (error) {
                    toast.error("Task creation failed " + error);
                    console.error(error);
                    setIsSubmitting(false);
                }
            })
            }>
                <h1>Create Task</h1>
                <div className="mb-5">
                    <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                    <input type="text" id="taskName" className='input input-bordered w-full' placeholder="Task Name" {...register('taskName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" {...register('description')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importance</label>
                    <select id="importance" className="select select-bordered w-full max-w-sm"  {...register('importance')} >
                        {Object.keys(Importance).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                    <select id="frequency" className="select select-bordered w-full max-w-sm"  {...register('frequency')}>
                        {Object.keys(Frequency).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="season" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suggested Season</label>
                    <select id="season" className="select select-bordered w-full max-w-sm"  {...register('season')}>
                        {Object.keys(Season).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="timeEstimate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estimated time in minutes</label>
                    <input type="number" id="timeEstimate" className='input input-bordered w-full max-w-xs'  {...register('timeEstimate')} />
                </div>
                <div className='mb-5 max-w-sm'>
                    <RoomMultiSelect register={register("rooms")} allRooms={allRooms} roomsSelected={[]} />
                </div>
                <button className="btn btn-primary mr-4" disabled={isSubmitting} type='submit'><span className={(isSubmitting) ? "loading loading-spinner": "hidden"}> </span>Create</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
                <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
            </form>
        </>
    )
}

export default NewTaskForm