'use client'
import { Room } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

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
            {/* <div className="join">
                <button className="join-item btn" onClick={() => changePage(1)} disabled={currentPage === 1}>First</button>
                <button className="join-item btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="join-item btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount}>Next</button>
                <button className="join-item btn" onClick={() => changePage(pageCount)} disabled={currentPage === pageCount}>Last</button>
            </div> */}
            <select defaultValue={10} onChange={e => changeRoom(parseInt(e.target.value))}>
                {allRooms.map(room =>
                    <option key={room.roomId} value={room.roomId}>{room.name}</option>
                )}
            </select>
        </>
    )
}

export default RoomSelector