import React from 'react'

interface Props {
    params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div>IssueDetailPage {id}</div>
  )
}

export default IssueDetailPage