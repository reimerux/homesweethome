import Link from "next/link";
import TaskGrid from "../TaskGrid";
import IssueSelector from "@/app/components/AllPendingSelector";

export const dynamic = 'force-dynamic';
const allTasks = ({ searchParams}: {searchParams: {page: string, pagesize: string}}) => {
  return (
    <div className='p-3'>
      <h1>All Scheduled Tasks</h1>
      <div className="mb-5"><Link href="/schedule" className='btn btn-sm mr-4'>Schedule New Task</Link></div>
      <TaskGrid selection="all" page={parseInt(searchParams.page)} pagesize={parseInt(searchParams.pagesize)}/>
    </div>
  )
}

export default allTasks