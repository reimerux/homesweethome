import React from 'react'
import TaskTable from './ProgramTaskTable'
import prisma from '@/prisma/client';

const Programpage = async () => {
    const tasks = await prisma.maintenanceTask.findMany({
        include:
          { rooms: { include: { room: true } } },
        orderBy: { taskId: 'asc' },
        where: {taskSchedule: {none: {}}}
      });
    
    return (
        <div className='p-3'>
            <h1>Program </h1>
            <span className="text-sm">Below is a list of unscheduled tasks. Select the tasks you would like to schedule. The Auto-Schedule function will select the first available timeslot based on frequency and season.</span>
            <div className="mt-2"><TaskTable data={tasks}/></div>
        </div>
    )
}

export default Programpage