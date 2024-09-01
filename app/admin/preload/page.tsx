'use client'

import React from 'react';
import AdminSideNav from '../AdminSideNav';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance } from '@prisma/client';
import preloadData from './preload.json'
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
  const tasks = preloadData.tasks
  const rooms = preloadData.rooms

  return (
    <div className='flex'>
      <div className='p-3'>
        <h1>Create preload Data</h1>

        <form className='max-w-m mx-auto' onSubmit={handleSubmit(async () => {

          await axios.post('../../api/tasks/mass', tasks);
          router.push("/admin/tasks?page=1&pagesize=10");
          router.refresh();
          toast.success("TaskSeed data loaded");
        })
        }>
          <button className="btn btn-primary mr-4" type='submit'>Create {tasks.length} Tasks</button>
          <p className='text-sm text-gray-400'>NOTICE: This action will load new tasks into the database.</p>
        </form>

        <form className='max-w-m mx-auto' onSubmit={handleSubmit(async () => {

          await axios.post('../../api/rooms/mass', rooms);
          router.push("/admin/rooms");
          router.refresh();
          toast.success("Room Seed data loaded");
        })
        }>
          <button className="btn btn-primary mr-4" type='submit'>Create {rooms.length} Rooms</button>
          <p className='text-sm text-gray-400'>NOTICE: This action will load new rooms into the database.</p>
        </form>

        <form className='max-w-m mx-auto' onSubmit={handleSubmit(async () => {

          await axios.post('../../api/dbreset');
          router.refresh();
          toast("Database refreshed");
        })
        }>
          <button className="btn btn-error mr-4" type='submit'>Delete All</button>
          <p className='text-sm text-gray-400'>NOTICE: This action will delete the entire database except user, home and tasks.</p>
        </form>
      </div>
    </div>
  )
}

export default NewTaskPage