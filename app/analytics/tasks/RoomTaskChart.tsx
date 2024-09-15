import Chart_BarVertical from '@/app/components/chart/Chart_BarVertical';
import prisma from '@/prisma/client';

const RoomTaskChart = async () => {
    const taskRooms = await prisma.room.findMany({
        include: { tasks: {include: {task: {include: {taskSchedule: true}} }}}
    });

    let formatData: any[] = []
    taskRooms.map(function (obj) {
        const record = { "Room": obj.shortName, "Count": obj.tasks.length }

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

export default RoomTaskChart