import React from 'react'
import { classNames } from '../URfunctions'

type Props = {
    data: any,
    vertical: boolean
}

const Metrics = ({ data, vertical }: Props) => {
    return (
        <div className={classNames((!vertical) && "stats-horizontal", (vertical) && "stats-vertical", "stats shadow w-46 mr-8")}>
            {data.map((result: any, i: number) => {
                const metricResult = data.find((element: any) => element.id === i)
                return (
                    <div key={i} className="stat">
                        <div className="stat-title">{metricResult.title}</div>
                        <div className="stat-value">{metricResult.result}</div>
                        <div className="stat-desc">{metricResult.subtitle}</div>
                    </div>)
            }
            )}
        </div>
    )
}

export default Metrics