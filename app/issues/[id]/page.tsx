import React from 'react'

interface Props {
    params: {id: number}
}

const IssueDetailPage = ({params: {id} } : Props) => {
  return (
    <div>IssueDetailPage {id}</div>
  )
}

export default IssueDetailPage