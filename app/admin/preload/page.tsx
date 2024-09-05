'use client'

import React from 'react';
import AdminSideNav from '../AdminSideNav';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance } from '@prisma/client';
import toast from 'react-hot-toast';


interface TaskForm {
  taskName: string;
  description: string;
  importance: Importance;
  frequency: Frequency;
}

const NewTaskPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TaskForm>();


  return (
    <div className='flex'>
    <AdminSideNav/>
      <div className='p-3'>
        <h1>Database reset</h1>


        <form className='max-w-m mx-auto' onSubmit={handleSubmit(async () => {

          await axios.post('../../api/dbreset');
          router.refresh();
          toast("Database refreshed");
        })
        }>
          <button className="btn btn-error mr-4" type='submit'>Delete All</button>
          <p className='text-sm text-gray-400'>NOTICE: This action will delete the entire database except user and home. Use backup to save the data and restore it if necessary.</p>
        </form>
      </div>
    </div>
  )
}

export default NewTaskPage