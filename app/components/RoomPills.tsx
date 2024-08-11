
type Props = {
    rooms: Array<any>
}

const RoomPills = async ({ rooms }: Props) => {

    if (!rooms) {return null}


    return (
        <>
            {rooms.map((room: any, i: number) =>
                <div key={i} className="badge badge-ghost max-w-20 text-nowrap text-xs sm:text-sm">{room.room.name.substring(0,10)}</div>
            )
            }
        </>
    )
}

export default RoomPills