import { useState } from 'react';
import AdminSideNav from '../AdminSideNav';
import BackupDownload from './BackupDownload';
import RestoreDownload from './RestoreDownload';

const objects = [
  { "tablename": "issue" },
  { "tablename": "room" },
  { "tablename": "maintenanceTask" },
]

const BackupPage = async () => {

  return (
    <div className='flex'>

      <AdminSideNav />
      <div className='p-3 '>
        <h1>Backup</h1>

        Download
        {objects.map((object, i) => {
          return <div key={i} className='mb-4'><BackupDownload object={object} /></div>
        }
        )}
        Restore
         <div className='mb-4'><RestoreDownload /></div>
      </div>
    </div>
  )
} 

export default BackupPage