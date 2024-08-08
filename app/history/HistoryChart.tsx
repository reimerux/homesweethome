import Chart_Area from '../components/Chart_Area';
import prisma from '@/prisma/client';


type Props = {
    dataType: string;
};

const HistoryChart = async (props: Props) => {

    const data = await prisma.taskHistory.groupBy({
        by: ["monthPerformed","yearPerformed","status"],
        _count: { taskId: true, historyId: true},
        having: {
            status: { in: ['COMPLETED']}
        }
    }
            );
    // const data = await results.data;

    let selection = "_count.taskId"
    if (props.dataType === 'HISTORY') { selection = "_count.historyId" }

    return (
        <>
            <Chart_Area data={data} dataKey={selection} XKey="monthPerformed" width={700} height={300} />
        </>
    )
}

export default HistoryChart