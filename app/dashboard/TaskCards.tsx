import prisma from '@/prisma/client';
import Link from 'next/link';
import { MdCalendarMonth, MdCheck, MdRedo } from 'react-icons/md';
import ImportanceBadge from '../components/ImportanceBadge';
import { addDays, dateColor } from '../components/URfunctions';

interface taskSchedule {
    scheduleId: number;
    task: {
        taskName: string;
        description: string;
        importance: string;
    }
    nextDueDate: Date;
    status: string;
}

const TaskCards = async () => {

    const tasks = await prisma.taskSchedule.findMany({
        where:
        {nextDueDate: {lt: addDays(new Date(),30)}},
        include: {task: true },
        orderBy: {nextDueDate: 'asc'}
    });

    return (
        
        <div className='flex-column'>
            <h1>Tasks scheduled for next 30 days ({tasks.length})</h1>
            <Link className="btn btn-sm" href="/dashboard/print" target="_blank">Print</Link>
            <div className='grid grid-cols-4 gap-4'>
                {tasks.map(task => <div key={task.scheduleId}className="card bg-base-100 w-88 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{task.task.taskName}
                            <ImportanceBadge importance={task.task.importance} /></h2>
                        
                        <p className={dateColor(task.nextDueDate.toString())}>{new Date(task.nextDueDate).toDateString()}</p>
                        <div className="card-actions justify-end">
                            <Link className='btn btn-sm btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck />Complete</Link>
                            <Link className='btn btn-sm' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo />Push</Link>
                            <Link className='btn btn-sm' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth />Unschedule</Link>
                        </div>
                    </div>
                </div>)}
            </div>

        </div>
    )
}

export default TaskCards