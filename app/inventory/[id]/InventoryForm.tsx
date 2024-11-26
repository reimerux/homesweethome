'use client'
import FormButtons from '@/app/components/FormButtons';
import InventoryEdit from '@/app/components/InventoryEdit';
import RoomMultiSelect from '@/app/components/RoomMultiSelect';
import { invType } from '@/app/components/URTypes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface inventoryForm {
    invId: number, name: string , content: string | null , type: string | null; rooms: []
}

type Props = {
    currentItem: any,
    id: number, allRooms: any, userId: string | undefined, username: string | null | undefined
}


const InventoryForm = ({ currentItem, id, allRooms, userId, username }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [contents, setContents] = useState(JSON.parse(currentItem.content))
    const { register, setValue, handleSubmit, watch } = useForm<inventoryForm>();
    // const type = watch("type")


    return (
        <>
        <form className='max-w-sm mx-auto' onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true)
            await axios.put('../../api/inventory/'+currentItem.invId, data);
            router.push("/inventory");
            router.refresh();
            toast.success("Item changed")
            setIsSubmitting(false)
          } catch (error) {
            toast.error("Item creation failed " + error);
            console.error(error);
            setIsSubmitting(false)
          }
        })
        }>
          <h1>Edit Inventory Item</h1>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name" className="input input-bordered w-full max-w-xs" defaultValue={currentItem.name}required {...register('name')} />
          </div>
          <div className="mb-5">
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
            <select id="type" className="select select-bordered w-full max-w-sm" disabled defaultValue={currentItem.type} {...register('type')}>
              {invType.map(item => <option key={item.id} value={item.id}>{item.id}</option>)}
            </select>
          </div>
          <RoomMultiSelect register={register("rooms")} allRooms={allRooms} roomsSelected={currentItem.rooms.map((room: any) => room.roomId.toString())}/>
          <InventoryEdit type={currentItem.type} content={contents} setContents={setContents} setValue={setValue} user={null}/>
          <FormButtons isSubmitting={isSubmitting} SubmitText="Change" />
        </form>
      </>
    )
}

export default InventoryForm