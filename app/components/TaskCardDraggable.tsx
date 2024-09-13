import { formatInTimeZone } from 'date-fns-tz'
import Link from 'next/link'
import { MdCalendarMonth, MdCheck, MdModeEditOutline, MdMoreHoriz, MdRedo } from 'react-icons/md'
import ImportanceBadge from './Badge_Importance'
import RoomPills from './Badge_Rooms'
import { dateColor } from './URfunctions'

type DraggableCardProps = {
    task: any,
    color: string;
    index: number;
    onDragStart: (index: number) => void;
}


const TaskCardDraggable = ({ task, color,
    index,
    onDragStart,
 }: DraggableCardProps) => {
    return (
        <>

            <div draggable key={task.scheduleId} className="card bg-gray-100 w-88 shadow-md h-full"
                onDragStart={() => onDragStart(index)}
            >
                <div className="card-body p-3">
                    <h3 className="text-md font-semibold line-clamp-2 ">{task.task.taskName}</h3>

                    <div className='hidden sm:flex'><ImportanceBadge importance={task.task.importance} />{(task.task.timeEstimate) ? <div className="ml-2 text-xs">{task.task.timeEstimate} min</div> : null}</div>
                    <div className='hidden sm:flex'><RoomPills rooms={task.task.rooms} /></div>

                    <p className={dateColor(task.nextDueDate.toString()) + ` inline-block text-xs sm:leading-none`}>{formatInTimeZone(task.nextDueDate, 'Europe/London', "MM/dd")}</p>
                    <div className="hidden join-horizontal md:join">
                        <Link className='btn btn-sm join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck />Complete</Link>
                        <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn btn-sm join-item "><MdMoreHoriz /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-40 p-2 shadow">
                                <li><Link className=' p-1 bg-white' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo />Push</Link></li>
                                <li><Link className=' p-1 bg-white' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth />Unschedule</Link></li>
                                <li><Link className=' p-1 bg-white' href={'/admin/tasks/' + task.taskId + '/edit'}><MdModeEditOutline />Edit</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="join join-horizontal md:hidden w-10">
                        <Link className='btn btn-sm p-2 join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck /></Link>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm bg-base-100 join-item"><MdMoreHoriz /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><Link className=' p-1 bg-white' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo /> Push</Link></li>
                                <li><Link className=' p-1 bg-white' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth /> Unschedule</Link></li>
                                <li><Link className=' p-1 bg-white' href={'/admin/tasks/' + task.taskId + '/edit'}><MdModeEditOutline />Edit</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TaskCardDraggable