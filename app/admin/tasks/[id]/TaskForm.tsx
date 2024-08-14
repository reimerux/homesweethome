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
    rooms: Array<any>;
    timeEstimate: number;
}

type Props = {
    currentTask: any,
    allRooms: Array<any>,
    id: number
}

const TaskForm = ({currentTask, allRooms, id}: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<TaskForm>();
  
    return (
        <>
            <form className='' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/tasks/' + id, data);
                router.push("/admin/tasks?page=1&pagesize=10");
                router.refresh();
                toast.success("Task updated");
                
            })
            }>
                <h1>Edit Task</h1>
                <div className="mb-5">
                    <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                    <input type="text" id="taskName" className='input input-bordered w-full' placeholder="Task Name" defaultValue={currentTask.taskName} {...register('taskName')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" defaultValue={currentTask.description}{...register('description')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importance</label>
                    <select id="importance" className="select select-bordered w-full max-w-sm" defaultValue={currentTask.importance} >
                        {Object.keys(Importance).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                    <select id="frequency" className="select select-bordered w-full max-w-sm" defaultValue={currentTask.frequency} {...register('frequency')}>
                        {Object.keys(Frequency).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="season" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suggested Season</label>
                    <select id="season" className="select select-bordered w-full max-w-sm"  defaultValue={currentTask.season} {...register('season')}>
                        {Object.keys(Season).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="timeEstimate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estimate in minutes</label>
                    <input id="timeEstimate" type="number" className="input input-bordered w-full"  defaultValue={currentTask.timeEstimate} {...register('timeEstimate')}/>   
                </div>
                <div className="mb-5">
                    <label htmlFor="rooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rooms</label>
                   
                    <select id="rooms" multiple className="select select-bordered w-full max-w-sm"  {...register("rooms")} defaultValue={currentTask.rooms.map((element: any) => element.roomId)} >
                        {allRooms.map(item => <option key={item.roomId}  value={item.roomId}>{item.name}</option>)}
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