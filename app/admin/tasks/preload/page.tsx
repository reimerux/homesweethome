'use client'

import React from 'react';
import AdminSideNav from '../../AdminSideNav';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance } from '@prisma/client';
import preloadTask from  '../preloadTask.json'

interface TaskForm {
      taskName: string;
    description: string;
    importance: Importance;
    frequency: Frequency;
}

 const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskForm>();
  const tasks = preloadTask

   return (
    <div className='flex'><AdminSideNav/>
    <div className='p-3'>
    <form className='max-w-m mx-auto' onSubmit={handleSubmit(async () => {
      preloadTask.forEach(async task => {
        await axios.post('../../api/tasks',task);
      });
      
      router.push("/admin/tasks")
    })
      }>
      <h1>Create preload Task</h1>
          <button className="btn btn-primary mr-4" type='submit'>Create</button>
          <p className='text-sm text-gray-400'>NOTICE: This action will load {preloadTask.length} new tasks into the database.</p>
     </form>
     </div>
     </div>
   )
 }

 export default NewTaskPage