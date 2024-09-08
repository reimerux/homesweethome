'use client'
import ImportanceBadge from '@/app/components/Badge_Importance';
import RoomPills from '@/app/components/Badge_Rooms';
import DateCompletionEntry from '@/app/components/DateCompletionEntry';
import FormButtons from '@/app/components/FormButtons';
import { calcDueDate, dateColor, formatDateWithDiff } from '@/app/components/URfunctions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const TaskActionForm = ({ operation, currentTask, id }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complDate, setComplDate] = useState(new Date())
  const [calcDate, setCalcDate] = useState(calcDueDate(currentTask.task.frequency, complDate));
  const router = useRouter();

  const { register, handleSubmit } = useForm<TaskForm>();
  const URL = (operation === "Complete") ? '/api/schedules/' + id + '/complete' : (operation === "Umschedule") ? '/api/schedules/' + id + '/unschedule' : '/api/schedules/' + id + '/push';
  const toastMessage = (operation === "Complete") ? 'Task completed' : (operation === "Unschedule") ? 'Task unscheduled' : 'Task pushed';

  const onDateChange = (event: any) => {
    event.preventDefault();
    setComplDate(event.target.value);
    setCalcDate(calcDueDate(currentTask.task.frequency, event.target.value));
  }

  return (
    <div>

      <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
        try {
          setIsSubmitting(true);
          await axios.put(URL, data);
          router.push("/dashboard");
          toast.success(toastMessage);
          router.refresh();
        } catch (error) {
          toast.error("Task completion failed " + error);
          console.error(error);
          setIsSubmitting(false);
        }
      })
      }>
        <h1>Edit Scheduled Task: {currentTask.task.taskName}</h1>
        <div><RoomPills rooms={currentTask.task.rooms} /></div>
        <ImportanceBadge importance={currentTask.task.importance} />
        <input type="text" className="hidden" id="scheduleId" value={id} required {...register('scheduleId')}></input>
        <input type="text" className="hidden" id="taskId" value={currentTask.taskId} {...register('taskId')}></input>
        <div className="mb-5 mt-5 h-fit ">
          <text className="block mb-2 text-sm font-medium text-gray-900">Instructions</text >
          <blockquote id="description" className="w-full p-2 whitespace-pre-line bg-slate-50">{currentTask.task.description}</blockquote >
        </div>

        {(operation != "Unschedule") ?
          <><div className="mb-5">
            <text className="block mb-2 text-sm font-medium text-gray-900">Scheduled Date</text >
            <text id="dueDate" className={dateColor(currentTask.nextDueDate)} >{formatDateWithDiff(currentTask.nextDueDate)}</text>
          </div>

            <ul className="timeline ">
              <DateCompletionEntry register={register('completionDate', { onChange: (e) => onDateChange(e) })} fieldName="Date of Completion" start={true} Date={complDate} />
              <li><hr /><div className="timeline-start sm:w-48"></div><div className="timeline-end">{currentTask.task.frequency}</div><hr /></li>
              <DateCompletionEntry register={register('calcDueDate')} fieldName="Next Scheduled of Date" start={false} Date={calcDate} />
            </ul>
          </>
          : <></>}


        {(operation != "Unschedule") ?
          <div className="mb-5">
            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">Notes</label >
            <textarea id="notes" className="textarea textarea-bordered w-full" placeholder="Enter your Notes" {...register('notes')}></textarea>
          </div> :
          <></>}
        {/* <button className="btn btn-primary mr-4" disabled={isSubmitting} type='submit'><span className={(isSubmitting) ? "loading loading-spinner" : "hidden"}> </span>{(operation === "COMPLETE") ? "Mark Complete" : (operation === "Unschedule") ? "Unschedule" : "Push"}</button>
        <button className="btn btn-ghost" type='reset'>Reset</button>
        <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button> */}
        <FormButtons isSubmitting={isSubmitting} SubmitText={operation}/>
        {(operation === "Push") ? <p className='text-sm text-gray-400'>Pushing will mark the task as &quot;not completed&quot; and autoschedule for the next frequency.</p> : <></>}
        {(operation === "Unschedule") ? <p className='text-sm text-gray-400'>Unscheduling will remove the task from the schedule. History will remain. Task can be rescheduled at a later time.</p> : <></>}
      </form>
    </div>
  )
}

export default TaskActionForm