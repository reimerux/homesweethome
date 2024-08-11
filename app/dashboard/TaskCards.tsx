import prisma from '@/prisma/client';
import Link from 'next/link';
import { MdCalendarMonth, MdCheck, MdRedo } from 'react-icons/md';
import ImportanceBadge from '../components/ImportanceBadge';
import { addDays, dateColor } from '../components/URfunctions';
import RoomPills from '../components/RoomPills';
import { Status } from '@prisma/client';

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
                {tasks.map(task => <div key={task.scheduleId} className="card card-compact bg-base-100 w-88 shadow-xl">
                    <div className="card-body">
                        <h2 className="sm:card-title">{task.task.taskName}</h2>
                        <div className='sm:flex'><RoomPills rooms={task.task.rooms}/></div>
                        
                        <div className='hidden sm:flex'><ImportanceBadge importance={task.task.importance} />{(task.task.timeEstimate) ? <div className="ml-2">{task.task.timeEstimate} min</div>: null}</div>
                        <p className={dateColor(task.nextDueDate.toString())+ ` hidden sm:block`}>{new Date(task.nextDueDate).toDateString()}</p>
                        <p className={dateColor(task.nextDueDate.toString()) + ` sm:hidden`}>{new Date(task.nextDueDate).toLocaleDateString().slice(0, -5)}</p>
                        <div className="hidden join-vertical sm:join">
                            <Link className='btn btn-sm join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck />Complete</Link>
                            <Link className='btn btn-sm join-item' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo />Push</Link>
                            <Link className='btn btn-sm join-item' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth />Unschedule</Link>
                        </div>
                        <div className="join join-vertical sm:hidden min-w-9">
                            <Link className='btn btn-sm join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck /></Link>
                            <Link className='btn btn-sm join-item' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo /></Link>
                            <Link className='btn btn-sm join-item' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth /></Link>
                        </div>
                    </div>
                </div>)}
            </div>

        </div>
    )
}

export default TaskCards