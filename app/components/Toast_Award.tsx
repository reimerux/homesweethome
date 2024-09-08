'use client'
import Image from 'next/image'
import React from 'react'

const Toast_Award = (awardName: string, t: any, toast: any) => {
  return (
    <div>
        <Image
                                        src="/award.gif"
                                        width={36}
                                        height={36}
                                        alt="Picture of the award"
                                      />
        <b>{awardName} achieved!</b><br />
        <button className="btn btn-ghost" onClick={() => toast.dismiss(t.id)}>
            Dismiss
        </button>
    </div>
)
}
 

export default Toast_Award