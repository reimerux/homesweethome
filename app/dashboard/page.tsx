import Metrics from '../components/chart/Metrics';
import Kpis from './Kpis';
import HouseInfo from './HouseInfo';
import IssueCards from './IssueCards';
import TaskCards from './TaskCards';

export const dynamic = 'force-dynamic';
const Dashboard = () => {

  return (
    <div className='p-3  bg-slate-100'>
      <div className="flex w-full ">
        <div className='hidden sm:block max-w-80'>
          <Kpis />
          </div>
        <div className="flex-col max-w-3xl mx-auto">
          <HouseInfo />
          <TaskCards />
          <IssueCards />
        </div>
      </div>
    </div>
  )
}

export default Dashboard