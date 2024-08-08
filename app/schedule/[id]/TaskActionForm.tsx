'use client'
import { calcDueDate, dateColor, formatDateWithDiff } from '@/app/components/URfunctions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface TaskForm {

    scheduleId: number;
    task: {
      taskName: string;
      description: string;
      importance: string;
      frequency: string;
    }
    taskId: number;
    nextDueDate: Date;
    status: string;
    notes: string;
    calcDueDate: Date;
    completionDate: Date;
  }

  type Props = {
    operation: string;
    currentTask: any,
    id: number
  }

const  TaskActionForm = ( props : Props) => {
    const router = useRouter();
    const defaultDate = new Date().toISOString().split('T')[0]
    const { register, handleSubmit } = useForm<TaskForm>();
    const URL = (props.operation==="COMPLETE") ? '/api/schedules/' + props.id + '/complete' : (props.operation==="UNSCHEDULE") ? '/api/schedules/' + props.id + '/unschedule' : '/api/schedules/' + props.id + '/push';
    const toastMessage = (props.operation==="COMPLETE") ? 'Task completed' : (props.operation==="UNSCHEDULE")? 'Task unscheduled' : 'Task pushed';
  return (
    <form className='max-w-xl mx-auto' onSubmit={handleSubmit(async (data) => {
        await axios.put(URL, data);
        //implement toast & intelligent return
        router.push("/dashboard");
        toast.success(toastMessage)
      })
      }>
        <h1>Edit Scheduled Task: {props.currentTask.task.taskName}</h1>
        <p>{props.currentTask.task.description}</p>
        <input type="text" className='hidden' value={props.id} required {...register('taskId')}></input>
        <div className="mb-5">
          <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importance</label >
          {props.currentTask.task.importance}
        </div>
        <div className="mb-5">
          <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label >
          {props.currentTask.task.frequency}
        </div>
        {(props.operation!="UNSCHEDULE")?
        <div className="mb-5">
          <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scheduled Date</label >
          <div className={dateColor(props.currentTask.nextDueDate)}>
            {formatDateWithDiff(props.currentTask.nextDueDate)}
          </div>
        </div>
        :<></>}
        {(props.operation==="COMPLETE")?
        <div className="mb-5">
          <label htmlFor="completionDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Completion</label >
            <input id="completionDate" type="date" className='w-200' required {...register('completionDate')} defaultValue={defaultDate}></input>   
        </div>
        :<></>}
        {(props.operation!="UNSCHEDULE")?
        <div className="mb-5">
          <label htmlFor="calcDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Next Scheduled Date</label >
          <input type="date" className='w-200' {...register('calcDueDate')} defaultValue={calcDueDate(props.currentTask.task.frequency, defaultDate).toISOString().split('T')[0]}></input>
        </div> :
        <></>}
        {(props.operation!="UNSCHEDULE")?
        <div className="mb-5">
          <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label >
          <textarea id="notes" className="textarea textarea-bordered w-full" placeholder="Enter your Notes" {...register('notes')}></textarea>
        </div>:
        <></>}
        <button className="btn btn-primary mr-4" type='submit'>{(props.operation==="COMPLETE") ? "Mark Complete" : (props.operation==="UNSCHEDULE") ? "Unschedule" : "Push" }</button>
        <button className="btn btn-ghost" type='reset'>Reset</button>
        {(props.operation==="PUSH") ? <p className='text-sm text-gray-400'>Pushing will mark the task as &quot;not completed&quot; and autoschedule for the next frequency.</p>:<></>}
        {(props.operation==="UNSCHEDULE")? <p className='text-sm text-gray-400'>Unscheduling will remove the task from the schedule. History will remain. Task can be rescheduled at a later time.</p>:<></>}
      </form>
  )
}

export default TaskActionForm