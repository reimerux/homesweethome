import { Importance } from '@prisma/client';
import { ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';


type Props = {
    register: UseFormRegisterReturn,
    defaultValue: Importance;
}

const ImportancePicker = ({ register, defaultValue }:Props): ReactElement => {

    const PriorityMap = [{ "id": 0, "Importance": "LOW" }, { "id": 1, "Importance": "MEDIUM" }, { "id": 2, "Importance": "HIGH" }]

    return (
        <>
            <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
            <input id="importance" type="range" min={0} max="2" defaultValue={PriorityMap.find(o => o.Importance === defaultValue)?.id} className="range" step="1"
            {...register}
             />
            <div className="flex w-full justify-between px-2 text-xs">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
            </div>
        </>
    )
}

export default ImportancePicker