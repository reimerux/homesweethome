import Chart_Area from '../components/Chart_Area';
import prisma from '@/prisma/client';
import { addDays } from '../components/URfunctions';


type Props = {
    dataType: string;
    timeFrame: string
};

const HistoryChart = async (props: Props) => {

    let data = [];
    if (props.timeFrame === "six") {
        data = await prisma.taskHistory.groupBy({
            by: ["monthPerformed", "yearPerformed", "status"],
            _count: { taskId: true, historyId: true },
            where: { datePerformed: { gt: addDays(new Date(), -180) } },
            having: {
                status: { in: ['COMPLETED'] },
            }
        }
        );
    } else {
        data = await prisma.taskHistory.groupBy({
            by: ["monthPerformed", "yearPerformed", "status"],
            _count: { taskId: true, historyId: true },
            having: {
                status: { in: ['COMPLETED'] }
            }
        }
        );
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let formatData: any[] = []
    data.map(function (obj) {
        const record = { "periodPerformed": months[obj.monthPerformed - 1].substring(0, 3) + " " + obj.yearPerformed, "yearPerformed": obj.yearPerformed, "status": obj.status, "Tasks": obj._count.taskId, "History": obj._count.historyId }

        formatData.push(record)
    }
    )

    let selection = "Tasks"
    if (props.dataType === 'HISTORY') { selection = "History" }

    return (
        <>
            <Chart_Area data={formatData} dataKey={selection} XKey="periodPerformed" width={700} height={300} />
        </>
    )
}

export default HistoryChart