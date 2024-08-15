import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import Link from 'next/link';
import TaskCard from '../components/TaskCard';
import { addDays } from '../components/URfunctions';

interface taskSchedule {
    scheduleId: number; taskId: number; nextDueDate: Date; lastCompletedDate: Date | null; status: Status; notes: string | null;
    task: {
      rooms: ({
          room: {
              roomId: number;
              name: string;
              notes: string | null;
              houseId: number;
          };
      } & {
          taskId: number;
          roomId: number;
          assignedAt: Date;
          assignedBy: string;
      })[];
  }  & {
    taskId: number; description: string | null;
    frequency: string; importance: string;
    season: string | null;
  }}

const TaskCards = async () => {
    let taskOverflow= 0;
    let tasks = await prisma.taskSchedule.findMany({
        where:
            { nextDueDate: { lt: addDays(new Date(), 30) } },
            include: { task: {include:{rooms: {include: {room: true}}}}},
        orderBy: { nextDueDate: 'asc' }
    });

    if (tasks.length>7) {taskOverflow= tasks.length - 7; tasks = tasks.slice(0, 7); }
    return (

        <div className='flex-column items-stretch'>
            <h1 className='text-sm sm:text-2xl'>Tasks scheduled for next 30 days ({tasks.length + taskOverflow})</h1>
            <Link className="btn btn-sm" href="/dashboard/print" target="_blank">Print</Link>
            <div className='grid grid-cols-4 gap-2'>
                {tasks.map(task => 
                <div key={task.task.taskId}><TaskCard task={task} overflow={0}/></div>
                )}
                {(taskOverflow > 0) ? <TaskCard task={null} overflow={taskOverflow}/> : null}
            </div>

        </div>
    )
}

export default TaskCards