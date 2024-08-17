import prisma from "@/prisma/client";
import RoomSelector from "../components/RoomSelector";
import HouseInfo from "../dashboard/HouseInfo";
import IssueCards from "../dashboard/IssueCards";
import TaskCards from "./TaskCards";


export const dynamic = 'force-dynamic';
const byRoomPage = async ({ searchParams}: {searchParams: {roomSelected: string}}) => {

  const allRooms = await prisma.room.findMany();

  return (
    <div className='p-3  bg-slate-100'>
      <div className="flex flex-col w-full ">
          <HouseInfo />
          <RoomSelector allRooms={allRooms} roomSelected={parseInt(searchParams.roomSelected)} />
          <TaskCards roomId={parseInt(searchParams.roomSelected)} />
          <IssueCards />
      </div>
    </div>
  )
}

export default byRoomPage