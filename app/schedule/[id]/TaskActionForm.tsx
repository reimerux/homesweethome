'use client'
import RoomPills from '@/app/components/RoomPills';
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

const  TaskActionForm = ( {operation, currentTask, id} : Props) => {
    const router = useRouter();
    const defaultDate = new Date().toISOString().split('T')[0]
    const { register, handleSubmit } = useForm<TaskForm>();
    const URL = (operation==="COMPLETE") ? '/api/schedules/' + id + '/complete' : (operation==="UNSCHEDULE") ? '/api/schedules/' + id + '/unschedule' : '/api/schedules/' + id + '/push';
    const toastMessage = (operation==="COMPLETE") ? 'Task completed' : (operation==="UNSCHEDULE")? 'Task unscheduled' : 'Task pushed';
  return (
    <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await axios.put(URL, data);
        //toDO: implement toast & intelligent return
        router.push("/dashboard");
        toast.success(toastMessage)
      })
      }>
        <h1>Edit Scheduled Task: {currentTask.task.taskName}</h1>
        <RoomPills rooms={currentTask.task.rooms}/>
        <input type="text" className="hidden" id="scheduleId" value={id} required {...register('scheduleId')}></input>
        <input type="text" className="hidden" id="taskId" value={currentTask.taskId} {...register('taskId')}></input>
        <div className="mb-5 mt-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label >
          {currentTask.task.description}
        </div>
        <div className="mb-5">
          <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900">Importance</label >
          {currentTask.task.importance}
        </div>
        <div className="mb-5">
          <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">Frequency</label >
          {currentTask.task.frequency}
        </div>
        {(operation!="UNSCHEDULE")?
        <div className="mb-5">
          <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">Scheduled Date</label >
          <div className={dateColor(currentTask.nextDueDate)}>
            {formatDateWithDiff(currentTask.nextDueDate)}
          </div>
        </div>
        :<></>}
        {(operation==="COMPLETE")?
        <div className="mb-5">
          <label htmlFor="completionDate" className="block mb-2 text-sm font-medium text-gray-900">Date of Completion</label >
            <input id="completionDate" type="date" className='w-200 border border-gray-300 rounded-md' required {...register('completionDate')} defaultValue={defaultDate}></input>   
        </div>
        :<></>}
        {(operation!="UNSCHEDULE")?
        <div className="mb-5">
          <label htmlFor="calcDate" className="block mb-2 text-sm font-medium text-gray-900">Next Scheduled Date</label >
          <input type="date" className='w-200 border border-gray-300 rounded-md' {...register('calcDueDate')} defaultValue={calcDueDate(currentTask.task.frequency, defaultDate).toISOString().split('T')[0]}></input>
        </div> :
        <></>}
        {(operation!="UNSCHEDULE")?
        <div className="mb-5">
          <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">Notes</label >
          <textarea id="notes" className="textarea textarea-bordered w-full" placeholder="Enter your Notes" {...register('notes')}></textarea>
        </div>:
        <></>}
        <button className="btn btn-primary mr-4" type='submit'>{(operation==="COMPLETE") ? "Mark Complete" : (operation==="UNSCHEDULE") ? "Unschedule" : "Push" }</button>
        <button className="btn btn-ghost" type='reset'>Reset</button>
        <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
        {(operation==="PUSH") ? <p className='text-sm text-gray-400'>Pushing will mark the task as &quot;not completed&quot; and autoschedule for the next frequency.</p>:<></>}
        {(operation==="UNSCHEDULE")? <p className='text-sm text-gray-400'>Unscheduling will remove the task from the schedule. History will remain. Task can be rescheduled at a later time.</p>:<></>}
      </form>
  )
}

export default TaskActionForm