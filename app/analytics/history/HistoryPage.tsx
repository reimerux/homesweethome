import TitleCard from '@/app/components/chart/TitleCard';
import HistoryChart from './HistoryChart';

export const dynamic = 'force-dynamic';
const HistoryPage = () => {


    return (
        
            <section className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <TitleCard title='Tasks completed all time' topMargin={"mt-2"} TopSideButtons={true}>
                    <HistoryChart dataType="TASKS" timeFrame='all'/>
                </TitleCard>
                <TitleCard title='Tasks completed past 6 months' topMargin={"mt-2"} TopSideButtons={true}>
                    <HistoryChart dataType="TASKS" timeFrame='six'/>
                </TitleCard>
            </section>
        
    )
}

export default HistoryPage