import Link from 'next/link'
import React from 'react'
import { MdCheck, MdRedo, MdCalendarMonth } from 'react-icons/md'
import ImportanceBadge from './ImportanceBadge'
import RoomPills from './RoomPills'
import { dateColor } from './URfunctions'
import { format } from 'date-fns'

type Props = {
    task: any,
    overflow: number
}

const TaskCard = ({ task, overflow }: Props) => {
    return (
        <>{(overflow > 0) ?
            <div key={100 + overflow} className="card card-compact bg-gray-100 w-88 h-full">
                <div className="card-body place-items-center place-content-center">
                    <a href="/tasks/all" className="text-md font-medium line-clamp-2">... {overflow} other Tasks</a>
                </div>
            </div> :
            
                <div key={task.scheduleId} className="card bg-gray-100 w-88 shadow-md h-full">
                    <div className="card-body p-3">
                        <h3 className="text-md font-semibold line-clamp-2 ">{task.task.taskName}</h3>

                        <div className='hidden sm:flex'><ImportanceBadge importance={task.task.importance} />{(task.task.timeEstimate) ? <div className="ml-2 text-xs">{task.task.timeEstimate} min</div> : null}</div>
                        <div className='hidden sm:flex'><RoomPills rooms={task.task.rooms} /></div>

                        <p className={dateColor(task.nextDueDate.toString()) + ` inline-block text-xs sm:leading-none`}>{format(task.nextDueDate, "MM/dd")}</p>
                        <div className="hidden join-vertical sm:join">
                            <Link className='btn btn-sm join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck />Complete</Link>
                            <Link className='btn btn-sm join-item bg-white' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo />Push</Link>
                            <Link className='btn btn-sm join-item bg-white' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth />Unschedule</Link>
                        </div>
                        <div className="join join-horizontal sm:hidden w-4">
                            <Link className='btn btn-sm p-2 join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck /></Link>
                            <Link className='btn btn-sm p-1 join-item bg-white' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo /></Link>
                            <Link className='btn btn-sm p-1 join-item bg-white' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth /></Link>
                        </div>
                    </div>
                </div>}
                
        </>
    )
}

export default TaskCard