import { Status } from '@prisma/client'
import React from 'react'
import { MdCancel, MdCheck } from 'react-icons/md'

type Props = {
    status: Status
}

const StatusIndicator = ({status}: Props) => {
  return (
    <div className='flex gap-1'>
    {(status==="COMPLETED") ? <MdCheck color='green' fontWeight={"bold"}/> : (status==="CANCELLED") ? <MdCancel  color='red' fontWeight={"bold"}/> : null}
    <span className="lowercase">{status}</span>
    </div>
  )
}

export default StatusIndicator