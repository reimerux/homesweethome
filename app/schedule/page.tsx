import prisma from '@/prisma/client';
import ScheduleForm from './ScheduleForm';


export const dynamic = 'force-dynamic';
const ScheduleTaskPage = async () => {
        const tasks = 
    
    await prisma.maintenanceTask.findMany({
        where: 
                {taskSchedule: {none:{}}
            }       
    }) 

    return (
        <div className='p-3'>
            {(tasks.length===0) ? <p>No more Tasks to schedule. All tasks have a schedule.</p> : <ScheduleForm tasks={tasks} />}
            
        </div>
    )
}

export default ScheduleTaskPage