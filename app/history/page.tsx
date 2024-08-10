import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';

export const dynamic = 'force-dynamic';
const HistoryPage = () => {


    return (
        <div className="p-3"><h1>Tasks Completed</h1>
            <section className="flex my-4 px-4 gap-3">
                <div className="w-1/2 h-[400px] bg-gray-100 rounded">
                    <p className='p-2'>Tasks completed all time</p>
                    <HistoryChart dataType="TASKS" timeFrame='all'/>
                </div>
                <div className="w-1/2 h-[400px] bg-gray-100 rounded">
                    <p className='p-2'>Tasks completed past 6 months</p>
                    <HistoryChart dataType="TASKS" timeFrame='six'/>
                </div>
            </section>
            <section className="flex my-4 px-4">
                <HistoryTable />
            </section>
        </div>
    )
}

export default HistoryPage