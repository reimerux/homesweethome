import { getServerSession } from 'next-auth';

const ProfileInfo = async () => {
    
    const session = await getServerSession();

    return (
       <div>
        {session?.user?.email}
       {session?.user?.name}
       </div>
    )
}

export default ProfileInfo