import Metrics from '@/app/components/chart/Metrics';
import { metricCalc } from '@/app/components/URfunctions';
import { metrics } from './metrics';


const CurrentPage = async () => {

    const results = await metricCalc(metrics);

    return (
        <div className="p-3">
            <section className="flex justify-center my-4 px-4">
                <Metrics data={results} vertical={false}/>
            </section>
        </div>
    )
}

export default CurrentPage

