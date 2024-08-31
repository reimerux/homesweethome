import { auth } from "@/auth";
import AchievementsBadges from "./Badge_achievement";


const ProfileInfo = async () => {

    const session = await auth();

    return (
       <div className="flex-col">
        <div>Email: {session?.user?.email}</div>
        <div>Name: {session?.user?.name}</div>
        <div>ID: {session?.user?.id}</div>
        <div className="mb-6">Role: {session?.user?.role}</div>
        <AchievementsBadges userId={session?.user.id} />
       </div>
    )
}

export default ProfileInfo