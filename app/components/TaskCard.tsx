import Link from 'next/link'
import React from 'react'
import { MdCheck, MdRedo, MdCalendarMonth } from 'react-icons/md'
import ImportanceBadge from './ImportanceBadge'
import RoomPills from './RoomPills'
import { dateColor } from './URfunctions'

type Props = {
    task: any
}

const TaskCard = ({task}: Props) => {
  return (
    <div key={task.scheduleId} className="card card-compact bg-base-100 w-88 shadow-xl">
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
                </div>
  )
}

export default TaskCard