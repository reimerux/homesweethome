'use client'
import { Room } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { classNames } from './URfunctions';

interface Props {
    roomSelected: number;
    allRooms: Array<Room>
}

const RoomSelector = ({ roomSelected, allRooms }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams()

    if (roomSelected < 1) return null;

    const changeRoom = (roomSelected: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('roomSelected', roomSelected.toString());
        router.push('?' + params.toString());
    }

    return (
        <>
            <div className='hidden sm:block'>
            {allRooms.map(room =>
                <button key={room.roomId} className={classNames(
                    (roomSelected === room.roomId) ? 'btn-active':null,
                    "btn btn-sm"
                )} onClick={() => changeRoom(room.roomId)} >{room.shortName}</button>
            )}
            </div>
            <select className="sm:hidden" onChange={e => changeRoom(parseInt(e.target.value))}>
                {roomSelected}
                {allRooms.map(room =>
                    <option key={room.roomId} selected={(roomSelected === room.roomId)} value={room.roomId}>{room.name}</option>
                )}
            </select>
        </>
    )
}

export default RoomSelector