import prisma from '@/prisma/client';

interface House {
    houseId: number;
    street: string;
    city: string;
}

const HouseInfo = async () => {

    const house =  await prisma.house.findFirst();
    
    return (
        
        <div>
            {house?.street}
        </div>
    )
}

export default HouseInfo