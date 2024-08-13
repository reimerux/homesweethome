import prisma from '@/prisma/client';
import Link from 'next/link';
import { MdCalendarMonth, MdCheck, MdRedo } from 'react-icons/md';
import ImportanceBadge from '../components/ImportanceBadge';
import { addDays, dateColor } from '../components/URfunctions';
import RoomPills from '../components/RoomPills';
import { Status } from '@prisma/client';
import TaskCard from '../components/TaskCard';

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

    const tasks = await prisma.taskSchedule.findMany({
        where:
            { nextDueDate: { lt: addDays(new Date(), 30) } },
            include: { task: {include:{rooms: {include: {room: true}}}}},
        orderBy: { nextDueDate: 'asc' }
    });

    return (

        <div className='flex-column'>
            <h1 className='text-sm sm:text-2xl'>Tasks scheduled for next 30 days ({tasks.length})</h1>
            <Link className="btn btn-sm" href="/dashboard/print" target="_blank">Print</Link>
            <div className='grid grid-cols-4 gap-4'>
                {tasks.map(task => 
                <div key={task.task.taskId}><TaskCard task={task} /></div>
                )}
            </div>

        </div>
    )
}

export default TaskCards