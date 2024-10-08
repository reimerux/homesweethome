type Props = {
    rooms: Array<any>
}

const RoomPills = ({ rooms }: Props) => {
    if (!rooms) { return null }
    return (
        <>
            {(rooms.length < 3) ?
                rooms.map((room: any, i: number) =>
                    <div key={i} className="badge badge-secondary w-20 text-nowrap text-xs sm:text-sm">{(!room.room.shortName) ? room.room.name.substring(0, 8) : room.room.shortName}</div>
                ) :
                <div key={1} className="badge badge-secondary w-20 text-nowrap text-xs sm:text-sm">{rooms.length} Rooms</div>
            }
        </>
    )
}
export default RoomPills