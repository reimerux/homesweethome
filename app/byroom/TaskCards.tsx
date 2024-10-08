import prisma from '@/prisma/client';
import { MdArrowOutward, MdCalendarMonth, MdLocalPrintshop } from 'react-icons/md';
import TaskCard from '../components/TaskCard';
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
    } & {
        taskId: number; description: string | null;
        frequency: string; importance: string;
        season: string | null;
    }
}

type Props = {
    roomId: number;
}

const TaskCards = async ({roomId}: Props) => {
    let taskOverflow = 0;

    if (!roomId) return null
    
    let tasks = await prisma.taskSchedule.findMany({
        include: { task: { include: { rooms: { include: { room: true } } } } },
        where: {
            task: { rooms: {some: {roomId:  roomId}}}
        },
        orderBy: { nextDueDate: 'asc' }
    });


    if (tasks.length > 7) { taskOverflow = tasks.length - 7; tasks = tasks.slice(0, 7); }
    return (

        <div aria-label="card" className="mt-6 p-8 rounded-2xl bg-white max-w-4xl shadow-md w-full">
            <div aria-label="header" className="flex items-center space-x-2">
                <MdCalendarMonth size={48} />
                <div className="space-y-0.5 flex-1">
                    <h3 className="font-medium text-lg tracking-tight text-gray-900 leading-tight"          >
                        Scheduled Tasks ({tasks.length + taskOverflow})
                    </h3>
                </div>
                <a href="/dashboard/print" target="_blank"
                    className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
                    <MdLocalPrintshop />
                </a>
                <a href="/tasks/all"
                    className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
                    <MdArrowOutward />
                </a>
            </div>
            <div aria-label="content" className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-2.5 items-stretch">
                {tasks.map(task => 
                <div key={task.task.taskId}><TaskCard task={task} overflow={0} /></div>
                )}
                {(taskOverflow > 0) ? <TaskCard task={null} overflow={taskOverflow} /> : null}
            </div>
        </div>
    )
}

export default TaskCards