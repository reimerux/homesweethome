import React from 'react'
import { classNames } from './URfunctions'

type Props = {
    content: any
}

const DimensionCard = ({ content }: Props) => {

    const fields = JSON.parse(content)

    const gridconfig = "grid grid-rows-"+fields.length+" grid-flow-col bg-zinc-50 p-2 rounded-xl"

    return (

        <div className={classNames("grid grid-flow-col bg-zinc-50 p-2 rounded-xl", "grid-rows-"+fields.length)}>
            {fields.map((field: any) =>             
            <div key={field.name} className='badge badge-neutral mr-2 mb-2'>{field.name}</div>
        )}
            {fields.map((field: any) =>  
                <div key={field.value} className="col-span-2">{field.value}</div>
            )}
        </div>
    )
}

export default DimensionCard