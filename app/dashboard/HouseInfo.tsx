
import { auth } from '@/auth';
import prisma from '@/prisma/client';

interface House {
    houseId: number;
    street: string;
    city: string;
}


const HouseInfo = async () => {
    const session = await auth()

    const house =  await prisma.house.findFirst();
    
    return (
        
        <div>
            {house?.street} / {session?.user.email} 
        </div>
    )
}

export default HouseInfo
