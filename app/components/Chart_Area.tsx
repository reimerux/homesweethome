"use client"
import React from 'react'
import { Area, AreaChart,  ResponsiveContainer,  Tooltip, XAxis, YAxis } from 'recharts'

type Props = {
    data: Array<any>;
    XKey: string;
    dataKey: string;
    width: number;
    height: number;
};


const Chart_Area = (props: Props) => {
    
  return (
    <>
      <ResponsiveContainer width="100%" height="90%" >
      <AreaChart width={props.width} height={props.height} data={props.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={props.XKey} />
        <YAxis domain={['dataMin0', 'dataMax']} interval={1}/>
        <Tooltip />
        <Area type="monotone" dataKey={props.dataKey} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>   
      </ResponsiveContainer>
      </>
  )
}

export default Chart_Area