import HistoryChart from './HistoryChart';

export const dynamic = 'force-dynamic';
const HistoryPage = () => {


    return (
        <div className="p-3">
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
        </div>
    )
}

export default HistoryPage