import React from 'react'

interface Props {
    params: {id: number}
}

const TaskDetailPage = ({params: {id} } : Props) => {
  return (
    <div>taskDetailPage {id}</div>
  )
}

export default TaskDetailPage