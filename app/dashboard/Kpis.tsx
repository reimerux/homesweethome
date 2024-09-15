import Metrics from '../components/chart/Metrics';
import { metricCalc } from '../components/URfunctions';
import { metrics } from './metrics';

const Kpis = async () => {

const results = await metricCalc(metrics);

  return (
    <Metrics data={results} vertical={true}/>
  )
}

export default Kpis