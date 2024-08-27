import prisma from "@/prisma/client";
import RoomSelector from "../components/RoomSelector";
import HouseInfo from "../dashboard/HouseInfo";
import IssueCards from "./IssueCards";
import TaskCards from "./TaskCards";


export const dynamic = 'force-dynamic';
const byRoomPage = async ({ searchParams}: {searchParams: {roomSelected: string}}) => {

  const allRooms = await prisma.room.findMany();

  return (
    <div className='p-3  bg-slate-100'>
      <div className="flex flex-col max-w-3xl mx-auto">
          <HouseInfo />
          <RoomSelector allRooms={allRooms} roomSelected={parseInt(searchParams.roomSelected)} />
          <TaskCards roomId={parseInt(searchParams.roomSelected)} />
          <IssueCards roomId={parseInt(searchParams.roomSelected)} />
      </div>
    </div>
  )
}

export default byRoomPage