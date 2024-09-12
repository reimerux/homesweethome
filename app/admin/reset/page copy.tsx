'use client'

import React, { useState } from 'react';
import AdminSideNav from '../AdminSideNav';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance } from '@prisma/client';
import toast from 'react-hot-toast';

const tables = [
  { tablename: "issue", name: "Issues"},
  { tablename: "maintenanceTask", name: "Tasks"},
  { tablename: "room", name: "Rooms"},
  { tablename: "taskSchedule", name: "Schedules"},
]


interface TaskForm {
  taskName: string;
  description: string;
  importance: Importance;
  frequency: Frequency;
}

const NewTaskPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<TaskForm>();


  return (
    <div className='flex'>
      <AdminSideNav />
      <div className='p-3'>
        <h1>Database reset</h1>


        <form className='max-w-m mx-auto' onSubmit={handleSubmit(async () => {
           setIsSubmitting(true);

          try {
            const response = await axios.post('../../api/dbreset');
            router.refresh();
            let detail = ""
            response.data.map((item: any) => detail += item.table + " - " + item.count + "\n")
            toast((t) => (<span><b>Database refreshed</b><br/>Instances deleted:<br/>{detail}<br/><button className="btn" onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button></span>));
            setIsSubmitting(false);
          }
          catch (error) {
            toast.error("Database deletion failed " + error);
            console.error(error);
            setIsSubmitting(false);
          }
        })
        }>
          <button className="btn btn-error mr-4" disabled={isSubmitting} type='submit'>Delete All</button>
          <p className='text-sm text-gray-400'>NOTICE: This action will delete the entire database except user and home. Use backup to save the data and restore it if necessary.</p>
        </form>
      </div>
    </div>
  )
}

export default NewTaskPage