import React from 'react'
import HistoryChart from './HistoryChart'

export const dynamic = 'force-dynamic';
const HistoryPage = () => {
    return (
        <div className="p-3"><h1>Tasks Completed</h1><section className="flex my-4 px-4 gap-3">
            <div className="w-1/2 h-[400px] bg-gray-100 rounded">
                <p className='p-2'>Distinct Tasks completed in Time period</p>
                <HistoryChart dataType="TASKS" />
            </div>
            <div className="w-1/2 h-[400px] bg-gray-100 rounded">
                <p className='p-2'>Distinct Actions completed in Time period</p>
                <HistoryChart dataType="HISTORY" />
            </div>
        </section>
        </div>
    )
}

export default HistoryPage