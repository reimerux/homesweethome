import React from 'react'
import Kpis from '../components/Kpis'
import TaskCards from './TaskCards'
import HouseInfo from './HouseInfo'

const Dashboard = () => {
  const parameter = 'PENDING'
  return (
    <div className='p-3'>
      <div className="flex w-full">
        <Kpis />
        <div className="divider divider-horizontal"></div>
        <div className="flex-col">
          <HouseInfo />
          <TaskCards />
        </div>
      </div>
    </div>
  )
}

export default Dashboard