import TitleCard from '@/app/components/chart/TitleCard'
import HistoryTaskTable from './HistoryTaskTable'
import RoomTaskChart from './RoomTaskChart'

const TaskPage = () => {
    return (
        <section className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
            <TitleCard title='Tasks by Room' topMargin={"mt-2"} TopSideButtons={false}>
                <RoomTaskChart/>
            </TitleCard>
            <TitleCard title='Recently completed tasks' topMargin={"mt-2"} TopSideButtons={false}>
                <HistoryTaskTable />
            </TitleCard>
        </section>
    )
}

export default TaskPage