'use client'
import { Frequency } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Task {
    taskId: number;
    taskName: string;
    description: string;
    frequency: Frequency;
}

interface ScheduleForm {
    taskId: number;
    nextDueDate: Date;
}

type Props = {
    tasks: Array<any>
}


const ScheduleForm = (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ScheduleForm>();
  return (
    <>
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(async (data) => {
                console.log(data);
                try {
                    const response = await axios.post('../../api/schedules', data);;
                    toast.success("Task scheduled");
                    router.push("/dashboard");
                } catch (error) {
                    toast.error("Task schedule failed " + error);
                    console.error(error);
                }
            })}>
                <h1>Schedule a new Task</h1>
                <div className="mb-5">
                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task</label>
                    <select id="task" className="select select-bordered w-full max-w-sm" {...register('taskId')}>
                        {props.tasks.map(task => <option key={task.taskId} value={task.taskId.toString()}>{task.taskName} / {task.frequency} ({task.season})</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                    <input type="date" id="startdate" className="input input-bordered w-full max-w-xs" required {...register('nextDueDate')} />
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Schedule</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
            </form>
    </>
  )
}

export default ScheduleForm