
import { SelectDataTable } from '@/app/components/Select-Data-table';
import AdminSideNav from '../AdminSideNav';
import { columns } from './columns';
import prisma from '@/prisma/client';

const tables = [
  { tableName: "issue", name: "Issues", notes: "Dependency on Rooms. Remove all room relations first." },
  { tableName: "maintenanceTask", name: "Tasks", notes: "Dependency on Rooms. Remove all room relations first." },
  { tableName: "room", name: "Rooms", notes: "Dependency on Tasks and Issues. Remove all relations first." },
  { tableName: "taskSchedule", name: "Schedules" },
  { tableName: "achievementOnUsers", name: "Achievements" },
  { tableName: "label", name: "Label" },
  { tableName: "labelsonIssues", name: "Labels On Issues" },
  { tableName: "roomsOnIssues", name: "Rooms On Issues" },
  { tableName: "roomsOnTasks", name: "Rooms On Tasks" },
  { tableName: "taskHistory", name: "Task History" }
]

const ResetDBPage = async () => {

  let data: any = []
  await Promise.all(tables.map(async (object: any, i: number) => {
    const tableName = object.tableName
    const count = await (prisma[tableName] as any).count()
    data.push({ "tableName": tableName, "name": object.name, "count": count, "notes": object?.notes })
  }))



  return (
    <div className='flex'>
      <AdminSideNav />
      <div className='p-3'>
        <h1>Database reset</h1>

        <SelectDataTable columns={columns} data={data} customCount={data.length} actionName='Delete' actionURL='/api/dbreset' />
        <p className='text-sm text-gray-400'>NOTICE: This action will delete the entire database except user and home. Use backup to save the data and restore it if necessary.</p>
      </div>
    </div>
  )
}

export default ResetDBPage