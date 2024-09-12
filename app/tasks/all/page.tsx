import { MdOutlineCalendarToday } from "react-icons/md";
import TaskGrid from "../TaskGrid";

export const dynamic = 'force-dynamic';
const allTasks = () => {
  return (
    <div className='p-3'>
      <h1>All Scheduled Tasks
        <a href="/schedule" aria-label="ScheduleTask"
          className="ml-5 inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
          <MdOutlineCalendarToday />
        </a>
      </h1>
      <TaskGrid selection="all" />
    </div>
  )
}

export default allTasks