import React from 'react'
import HistoryIssueTable from './HistoryIssueTable'
import TitleCard from '@/app/components/chart/TitleCard'
import RoomIssueChart from './RoomIssueChart'

const IssuePage = () => {
    return (
        <section className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
            <TitleCard title='Issues by Room' topMargin={"mt-2"} TopSideButtons={false}>
                <RoomIssueChart />
            </TitleCard>
            <TitleCard title='Recently completed issues' topMargin={"mt-2"} TopSideButtons={false}>
                <HistoryIssueTable />
            </TitleCard>
        </section>
    )
}

export default IssuePage