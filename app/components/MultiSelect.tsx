"use client"
import { Room } from '@prisma/client';
import { useState } from 'react';

type Props = {
    formFieldName: string,
    values: any,
    selected: any
}

const MultiSelect = ({formFieldName, values, selected }: Props) => {
    //need to transfrom selected into preseed
    const [selectedOptions, setSelectedOptions] = useState(selected[""]);
    
    const handleChange = (e: { target: { checked: any; value: any; }; }) => {
        const isChecked = e.target.checked;
        const optionValue = e.target.value;
      
        const selectedOptionSet = new Set(selectedOptions);
      
        if (isChecked) {
          selectedOptionSet.add(optionValue);
        } else {
          selectedOptionSet.delete(optionValue);
        }
      
        const newSelectedOptions = Array.from(selectedOptionSet);
      console.log(newSelectedOptions)
        setSelectedOptions(newSelectedOptions);
        // onChange(newSelectedOptions);
      };

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer"/>

      <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
        {formFieldName}
      </div>

      <div className="absolute bg-white border p-2 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
      <ul>
        {/* {JSON.stringify(values)} */}
        {JSON.stringify(selected)}
          {values.map((value: Room, i: number) => {
            return (
              <li key={i}>
                <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                  <input
                    type="checkbox"
                    defaultChecked={selected.find((el: any) => el.roomId === value.roomId)}
                    name={formFieldName}
                    value={value.roomId}
                    className="cursor-pointer"
                    onChange={handleChange}
                    
                  />
                  <span className="ml-1">{value.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}

export default MultiSelect