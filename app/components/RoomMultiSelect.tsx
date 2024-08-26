import { Room } from '@prisma/client';
import React, { ReactElement } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register: UseFormRegisterReturn,
  roomsSelected: Array<string>;
  allRooms: Array<Room>
}

const RoomMultiSelect = ({ roomsSelected, allRooms, register }: Props): ReactElement => {

  return (
    <>
      <label htmlFor="rooms" className="block mb-2 text-sm font-medium text-gray-900 ">Rooms</label>
      <select id="rooms" multiple className="select select-bordered w-full max-w-sm" defaultValue={roomsSelected} {...register} >
        {allRooms.map(item => <option key={item.roomId} value={item.roomId}>{item.name}</option>)}
      </select>
    </>
  )
}

export default RoomMultiSelect