import Link from "next/link";
import { MdOutlineCalendarToday } from "react-icons/md";
import TaskGrid from "../TaskGrid";

export const dynamic = 'force-dynamic';
const allTasks = ({ searchParams}: {searchParams: {page: string, pagesize: string}}) => {
  return (
    <div className='p-3'>
      <h1>All Scheduled Tasks
        <a href="/schedule"
          className="ml-5 inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
          <MdOutlineCalendarToday />
        </a>
      </h1>
      {/* <div className="mb-5"><Link href="/schedule" className='btn btn-sm mr-4'>Schedule New Task</Link></div> */}
      <TaskGrid selection="all" page={parseInt(searchParams.page)} pagesize={parseInt(searchParams.pagesize)}/>
    </div>
  )
}

export default allTasks