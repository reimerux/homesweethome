'use client'

import React from 'react';
import AdminSideNav from '../../AdminSideNav';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance } from '@prisma/client';
import preloadTask from  '../preloadTask.json'
import toast from 'react-hot-toast';

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

        await axios.post('../../api/tasks/mass',preloadTask);
        router.push("/admin/tasks");
        toast("Seed data loaded");
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