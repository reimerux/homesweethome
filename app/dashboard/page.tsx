import React from 'react'
import Kpis from '../components/Kpis'
import TaskCards from './TaskCards'
import HouseInfo from './HouseInfo'

export const dynamic = 'force-dynamic';
const Dashboard = () => {
  const parameter = 'PENDING'
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