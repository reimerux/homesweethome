import Link from 'next/link'
import React from 'react'
import { MdCheck, MdRedo, MdCalendarMonth } from 'react-icons/md'
import ImportanceBadge from './ImportanceBadge'
import RoomPills from './RoomPills'
import { dateColor } from './URfunctions'

type Props = {
    task: any,
    overflow: number
}

const TaskCard = ({ task, overflow }: Props) => {
    return (
        <>{(overflow > 0) ?
            <div key={100 + overflow} className="card card-compact bg-base-100 w-88 shadow-md h-full">
                <div className="card-body place-items-center place-content-center">
                    <a href="/tasks/all" className="sm:card-title line-clamp-2">... {overflow} other Tasks</a>
                </div>
            </div> :
            <div key={task.scheduleId} className="card card-compact bg-base-100 w-88 shadow-md h-full">
                <div className="card-body">
                    <h3 className="sm:card-title line-clamp-2">{task.task.taskName}</h3>

                    <div className='sm:flex'><RoomPills rooms={task.task.rooms} /></div>

                    <div className='hidden sm:flex'><ImportanceBadge importance={task.task.importance} />{(task.task.timeEstimate) ? <div className="ml-2">{task.task.timeEstimate} min</div> : null}</div>
                    <p className={dateColor(task.nextDueDate.toString()) + ` hidden sm:block`}>{new Date(task.nextDueDate).toDateString()}</p>
                    <p className={dateColor(task.nextDueDate.toString()) + ` sm:hidden`}>{new Date(task.nextDueDate).toLocaleDateString().slice(0, -5)}</p>
                    <div className="hidden join-vertical  sm:join">
                        <Link className='btn btn-sm join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck />Complete</Link>
                        <Link className='btn btn-sm join-item' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo />Push</Link>
                        <Link className='btn btn-sm join-item' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth />Unschedule</Link>
                    </div>
                    <div className="join join-horizontal sm:hidden w-4">
                        <Link className='btn btn-sm p-2 join-item btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck /></Link>
                        <Link className='btn btn-sm p-1 join-item' href={'/schedule/' + task.scheduleId + '/push'}><MdRedo /></Link>
                        <Link className='btn btn-sm p-1 join-item' href={'/schedule/' + task.scheduleId + '/unschedule'}><MdCalendarMonth /></Link>
                    </div>
                </div>
            </div>}
            </>
  )
}

export default TaskCard