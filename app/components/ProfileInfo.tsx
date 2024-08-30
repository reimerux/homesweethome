import { auth } from "@/auth";


const ProfileInfo = async () => {

    
    const session = await auth();

    return (
       <div className="flex-col">
        <div>Email: {session?.user?.email}</div>
        <div>Name: {session?.user?.name}</div>
        <div>ID: {session?.user?.id}</div>
        <div>Role: {session?.user?.role}</div>
       </div>
    )
}

export default ProfileInfo