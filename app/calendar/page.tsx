import React from 'react'
import TaskCalendar from './TaskCalendar'
import prisma from '@/prisma/client'

export const dynamic = 'force-dynamic';
const CalendarPage = async () => {
    
    const tasks = await prisma.taskSchedule.findMany({
        include: { task: {include:{rooms: {include: {room: true}}}}},
    })

    return (
        <div className='p-3'>
            <h1>Calendar</h1>
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <TaskCalendar tasks={tasks}/>
            </div>
        </div>
    )
}

export default CalendarPage