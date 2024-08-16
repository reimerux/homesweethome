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
    scheduleAnother: boolean;
}

type Props = {
    tasks: Array<any>
}


const ScheduleForm = (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ScheduleForm>();
  return (
    <>
    <form className="max-w-3xl mx-auto" onSubmit={handleSubmit(async (data) => {
                try {
                    const response = await axios.post('../../api/schedules', data);;
                    if (!data.scheduleAnother){
                        toast.success("Task scheduled");
                        router.push("/dashboard");} else
                        {
                            toast.success("Task scheduled");
                            router.push("/schedule");
                            router.refresh();
                        }
                } catch (error) {
                    toast.error("Task schedule failed " + error);
                    console.error(error);
                }
            })}>
                <h1>Schedule a new Task</h1>
                <div className="mb-5">
                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task</label>
                    <select id="task" className="select select-bordered w-full max-w-sm" {...register('taskId')}>
                        {props.tasks.map(task => <option key={task.taskId} value={task.taskId.toString()}>{(task.season==='NONE' || task.season===null)? task.taskName + " / " + task.frequency : task.taskName + " / " + task.frequency + " ("+task.season+")"}</option>)}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                    <input type="date" id="startdate" className="input input-bordered w-full max-w-xs" required {...register('nextDueDate')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><input className="mr-2 leading-tight" type="checkbox" required {...register('scheduleAnother')}/> Schedule Another
                    </label>
                </div>
                
                <button className="btn btn-primary mr-4" type='submit'>Schedule</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
            </form>
    </>
  )
}

export default ScheduleForm