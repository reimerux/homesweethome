import Chart_BarVertical from '@/app/components/chart/Chart_BarVertical';
import prisma from '@/prisma/client';

const RoomIssueChart = async () => {
    const issueRooms = await prisma.room.findMany({
        include: { issues: {include: {issue: true }}}
    });


    let formatData: any[] = []
    issueRooms.map(function (obj) {
        const record = { "Room": obj.shortName, "Count": obj.issues.length }

        formatData.push(record)
    }
    )

    let selection = "Count"

    return (
        <>
            <Chart_BarVertical data={formatData} dataKey={selection} XKey="Room" width={400} height={400} />
        </>
    )
}

export default RoomIssueChart