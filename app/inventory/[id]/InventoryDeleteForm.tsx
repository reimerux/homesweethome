'use client'
import FormButtons from '@/app/components/FormButtons';
import { displayInventoryContent } from '@/app/components/URTypes';
import { Frequency, Importance, Season } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface InventoryForm {
    invId: number, name: string , description: string | null , vendor: string | null; itemNumber: string | null;
}

type Props = {
    currentItem: any,
    id: number,
}

const TaskForm = ({currentItem, id}: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { register, handleSubmit } = useForm<InventoryForm>();
    return (
        <>
            <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
                try{   
                    setIsSubmitting(true);
                    await axios.delete('/api/inventory/' + id);
                    router.push("/inventory");
                    toast.success("Inventory Item deleted");
                    setIsSubmitting(false);
                } catch (error) {
                    toast.error("Item deletion failed " + error);
                    console.error(error);
                }
            })
            }>
                <h1>Delete Inventory Item</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                    <input type="text" id="name" className='input input-bordered w-full max-w-xs' disabled placeholder="Task Name" defaultValue={currentItem.name} {...register('name')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                    <input type="text" id="type" className='input input-bordered w-full max-w-xs' disabled placeholder="Task Name" defaultValue={currentItem.type} {...register('name')} />
                </div>
                {displayInventoryContent(currentItem.content)}

                <FormButtons isSubmitting={isSubmitting} SubmitText="Delete" />
            </form>
        </>
    )
}

export default TaskForm