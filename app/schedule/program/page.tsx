import React from 'react'
import TaskTable from './ProgramTaskTable'
import prisma from '@/prisma/client';

const Programpage = async () => {
    const tasks = await prisma.maintenanceTask.findMany({
        include:
          { rooms: { include: { room: true } } },
        orderBy: { taskId: 'asc' }
    
      });
    
      const taskSchedule = await prisma.taskSchedule.findMany({
        where: { status: "PENDING" }
      })
    
      var data = tasks.map((t: any) => ({ ...t, ...taskSchedule.find(ts => ts.taskId === t.taskId) }));

    return (
        <div className='p-3'>
            <h1>Program Page</h1>
            <div><TaskTable data={data}/></div>
            <div>Selection Results</div>
        </div>
    )
}

export default Programpage