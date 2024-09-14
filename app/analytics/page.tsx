import Tabs  from '../components/Tabs';
import CurrentPage from './current/CurrentPage';
import HistoryPage from './history/HistoryPage';
import IssuePage from './issues/IssuePage';
import TaskPage from './tasks/TaskPage';

export const dynamic = 'force-dynamic';
const AnalyticsPage = () => {
  return (
    <div className='p-3'>
      <h1>Analytics</h1>
      <Tabs items={items}/>
    </div>
  )
}

export default AnalyticsPage

// Tabs confuguration
const items = [
  {label: "Current", content: <CurrentPage/>},
  {label: "History", content: <HistoryPage/>},
  {label: "Issues", content: <IssuePage/>},
  {label: "Tasks", content: <TaskPage/>}
]