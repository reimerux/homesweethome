import { addDays } from '@/app/components/URfunctions';
import prisma from '@/prisma/client';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import HouseInfo from '../HouseInfo';

export const dynamic = 'force-dynamic';
const PrintTaskList = async () => {
  const tasks = await prisma.taskSchedule.findMany({
    where:
    {nextDueDate: {lt: addDays(new Date(),30)}},
    include: {task: true },
    orderBy: {nextDueDate: 'asc'}
});

  return (
    <div className="overflow-x-auto">
      Home Maintenance Task List (next 30 days) printed on: {new Date().toISOString()}
    <HouseInfo />
    <table className="table table-zebra">
      <thead >
        <tr className='border border-slate-800'>
          <th className='border border-slate-800'>Task</th>
          <th className='border border-slate-800'>Description</th>
          <th className='border border-slate-800'>Importance</th>
          <th className='border border-slate-800' >Due Date</th>
          <th className='border border-slate-800'>Completed</th>
          <th className='border border-slate-800'>Notes</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task =>
        <tr key={task.task.taskName} className='border border-slate-800'>
          <td className='border border-slate-800'>{task.task.taskName}</td>
          <td className='border border-slate-800'>{task.task.description}</td>
          <td className='border border-slate-800'>{task.task.importance}</td>
          <td className='border border-slate-800'>{new Date(task.nextDueDate).toDateString()}</td>
          <td className='border border-slate-800'><MdCheckBoxOutlineBlank /></td>
          <td className='border border-slate-800'></td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
  )
}

export default PrintTaskList