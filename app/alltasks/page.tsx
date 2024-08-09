import React from 'react'
import AllTaskGrid from "./AllTaskGrid"

export const dynamic = 'force-dynamic';
const allTasks = () => {
  return (
    <div className='p-3'>
      <h1>All Tasks</h1>
      <AllTaskGrid />
    </div>
  )
}

export default allTasks