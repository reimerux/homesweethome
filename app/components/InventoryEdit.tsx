import { Dispatch, ReactElement, SetStateAction } from 'react';
import { parseInventoryContent } from './URTypes';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
    content: Array<any>,
    setContents: Dispatch<SetStateAction<any>>,
    user: string | null | undefined,
    setValue: UseFormSetValue<any>
    type: string
}

const InventoryEdit = ({ content, setContents, setValue,  type }: Props): ReactElement => {


    const typeInfo = parseInventoryContent(type)

    let currentContent = typeInfo?.dimensions.map((dimension, index) => { return ({name:dimension, value: content[index]?.value})})

    function handleChange(index: number, value: string) {
        
        (currentContent)? currentContent[index].value = value : null;
        setContents(currentContent)
        setValue('content', JSON.stringify(currentContent));
    }

    return (
        <div className="card card-compact shadow-md p-3 mb-6">
            <div className='card-title'>Attributes</div>
            <div className="card-body">
                {typeInfo?.dimensions.map((dimension: any, index: number) =>
                    <div className="mb-5" key={index}>
                        <label htmlFor={dimension} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{dimension}</label>
                        <input type='text' id={dimension} className="input input-bordered w-full max-w-xs" defaultValue={content[index]?.value} onChange={(e) => handleChange(index, e.target.value)} />
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default InventoryEdit