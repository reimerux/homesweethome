import { displayInventoryContent } from '@/app/components/URTypes';
import HouseInfo from '@/app/dashboard/HouseInfo';
import prisma from '@/prisma/client';
import { format } from 'date-fns';

const PrintTaskList = async () => {
  const inventory = await prisma.inventory.findMany({include: {rooms: {include: {room: true}}}});
  
  

  return (
    <div className="overflow-x-auto">
      Home Inventory List printed on: {format(new Date().toISOString(),'MM/dd/yyyy hh:mm')}
    <HouseInfo />
    <h1 className='mt-10'>Inventory Items</h1>
    <table className="table table-zebra">
      <thead >
        <tr className='border border-slate-800'>
          <th className='border border-slate-800'>ID</th>
          <th className='border border-slate-800'>Name</th>
          <th className='border border-slate-800'>Type</th>
          <th className='border border-slate-800 min-w-64'>Notes</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map(item =>
        <tr key={item.name} className='border border-slate-800'>
          <td className='border border-slate-800'>{item.invId}</td>
          <td className='border border-slate-800'>{item.name}</td>
          <td className='border border-slate-800'>{item.type}</td>
          <td className='border border-slate-800'>{displayInventoryContent(item.content)}</td>
        </tr>
      )}
      </tbody>
    </table>
    {/* <h1 className='mt-10'>Pending Issues (oldest first)</h1> */}
    {/* <table className="table table-zebra">
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
    </table> */}
  </div>
  )
}

export default PrintTaskList