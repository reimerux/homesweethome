import React from 'react'

interface Props {
    params: Promise<{ id: string }>
}

const TaskDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div>taskDetailPage {id}</div>
  )
}

export default TaskDetailPage