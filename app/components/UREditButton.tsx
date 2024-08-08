
import Link from 'next/link'
import React from 'react'
import { MdCheck, MdRedo } from 'react-icons/md'

type Props ={
    schedule: number,
}

const UREditButton = (schedule: Props) => {
  return (
    <div>
        <Link className='btn btn-sm btn-primary' href={'/schedule/' +schedule + '/complete'}><MdCheck /></Link><Link className='btn btn-sm' href={'/schedule/' + schedule + '/push/'}><MdRedo /></Link>
    </div>
  )
}

export default UREditButton