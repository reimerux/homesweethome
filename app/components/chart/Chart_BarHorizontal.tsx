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


const Chart_BarHorizontal = (props: Props) => {

  return (
    <>
      <ResponsiveContainer width="100%" height="90%" >
        <BarChart width={props.width} height={props.height} data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey={props.XKey} />
          <YAxis domain={['0', 'dataMax']} interval={1} />
          <Tooltip />
          <Bar dataKey={props.dataKey} fill="#8884d8" activeBar={<Rectangle fill="url(#colorUv)" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default Chart_BarHorizontal