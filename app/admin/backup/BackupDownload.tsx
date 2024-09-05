import prisma from '@/prisma/client'
import React from 'react'
import DownloadFile from '@/app/components/DownloadFile';

type Props = {
    object: any;
}

const BackupDownload =  async ({object}:Props) => {   
  
        const data = await (prisma[object.tablename] as any).findMany();

    return (
        <>
                <DownloadFile data={data} fileName={object.tablename} type="CSV"/>
                <DownloadFile data={data} fileName={object.tablename} type="JSON"/> 
        </>
    )
}

export default BackupDownload