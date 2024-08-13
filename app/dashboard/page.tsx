import Kpis from '../components/Kpis';
import HouseInfo from './HouseInfo';
import TaskCards from './TaskCards';

export const dynamic = 'force-dynamic';
const Dashboard = () => {
  
  return (
    <div className='p-3'>
      <div className="flex w-full">
        <div className='hidden sm:block max-w-80'><Kpis /></div>
        <div className="flex-col">
          <HouseInfo />
          <TaskCards />
        </div>
      </div>
    </div>
  )
}

export default Dashboard