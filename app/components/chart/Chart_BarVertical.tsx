"use client"
import React from 'react'
import { Area, AreaChart, Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {
  data: Array<any>;
  XKey: string;
  dataKey: string;
  width: number;
  height: number;
};


const Chart_BarVertical = ({data,XKey,dataKey,width,height}: Props) => {

  return (  
      <ResponsiveContainer width="100%" height="99%" >
        <BarChart width={width} height={height} layout="vertical" data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <YAxis dataKey={XKey} type="category"  fontSize={12} interval={0}/>
          <XAxis type="number" domain={['0', 'dataMax']} interval={1} />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#8884d8" activeBar={<Rectangle fill="url(#colorUv)" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default Chart_BarVertical