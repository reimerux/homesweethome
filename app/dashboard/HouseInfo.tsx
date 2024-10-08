
import { auth } from '@/auth';
import prisma from '@/prisma/client';

const HouseInfo = async () => {
    const session = await auth()
    const house = await prisma.house.findFirst()
    
    return (
        <div>
            {(!house) ? <span>No house</span> : <span>{house.street}</span> } / {session?.user.email}            
        </div>
    )
}

export default HouseInfo
