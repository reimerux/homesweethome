import React from 'react'
import { DataTable } from '../components/Data-table'
import prisma from '@/prisma/client';
import { columns } from './columns'

const HistoryTable = async () => {
    const taskHistory =  await prisma.taskHistory.findMany({
        include: {task: true },
        orderBy: {datePerformed: 'desc'}
    });


  return (
    <div><DataTable columns={columns} data={taskHistory} /></div>
  )
}

export default HistoryTable