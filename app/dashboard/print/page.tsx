import { addDays } from '@/app/components/URfunctions';
import prisma from '@/prisma/client';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import HouseInfo from '../HouseInfo';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';
const PrintTaskList = async () => {
  const tasks = await prisma.taskSchedule.findMany({
    where:
    {nextDueDate: {lt: addDays(new Date(),30)}},
    include: {task: true },
    orderBy: {nextDueDate: 'asc'}
});
  const issues = await prisma.issue.findMany({
    where:
    {status: "PENDING"},
    orderBy: {createdAt: 'asc'}
});

  return (
    <div className="overflow-x-auto">
      Home List  printed on: {new Date().toISOString()}
    <HouseInfo />
    <h1 className='mt-10'>Scheduled Maintenance Tasks (next 30 days)</h1>
    <table className="table table-zebra">
      <thead >
        <tr className='border border-slate-800'>
          <th className='border border-slate-800'>Task</th>
          <th className='border border-slate-800'>Description</th>
          <th className='border border-slate-800'>Importance</th>
          <th className='border border-slate-800'>Due Date</th>
          <th className='border border-slate-800'>Completed</th>
          <th className='border border-slate-800 min-w-64'>Notes</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task =>
        <tr key={task.task.taskName} className='border border-slate-800'>
          <td className='border border-slate-800'>{task.task.taskName}</td>
          <td className='border border-slate-800'>{task.task.description}</td>
          <td className='border border-slate-800'>{task.task.importance}</td>
          <td className='border border-slate-800'>{format(task.nextDueDate, "MM/dd/yy")}</td>
          <td className='border border-slate-800'><MdCheckBoxOutlineBlank /></td>
          <td className='border border-slate-800'></td>
        </tr>
      )}
      </tbody>
    </table>
    <h1 className='mt-10'>Pending Issues (oldest first)</h1>
    <table className="table table-zebra">
      <thead >
        <tr className='border border-slate-800'>
          <th className='border border-slate-800'>ID</th>
          <th className='border border-slate-800'>Title</th>
          <th className='border border-slate-800'>Description</th>
          <th className='border border-slate-800'>Priority</th>
          <th className='border border-slate-800'>Created Date</th>
          <th className='border border-slate-800'>Completed</th>
          <th className='border border-slate-800 min-w-64'>Notes</th>
        </tr>
      </thead>
      <tbody>
        {issues.map(issue =>
        <tr key={issue.issueId} className='border border-slate-800'>
          <td className='border border-slate-800'>{issue.issueId}</td>
          <td className='border border-slate-800'>{issue.title}</td>
          <td className='border border-slate-800'>{issue.description}</td>
          <td className='border border-slate-800'>{issue.priority}</td>
          <td className='border border-slate-800'>{format(issue.createdAt, "MM/dd/yy")}</td>
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