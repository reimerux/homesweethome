'use client'

import React from 'react';
import AdminSideNav from '../../AdminSideNav';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance, Season } from '@prisma/client';

interface TaskForm {
      taskName: string;
    description: string;
    importance: Importance;
    frequency: Frequency;
    season: Season;
}

 const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskForm>();

   return (
    <div className='flex'><AdminSideNav/>
    <div className='p-3'>
    <form className='max-w-m mx-auto' onSubmit={handleSubmit(async (data) => {
      await axios.post('../../api/tasks',data);
      router.push("/admin/tasks")
    })
      }>
      <h1>Create Task</h1>
          <div className="mb-5">
            <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
            <input type="text" id="taskName" className='input input-bordered w-full max-w-xs' placeholder="Task Name" {...register('taskName')} />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" {...register('description')} />
          </div>
          <div className="mb-5">
            <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <select id="importance" className="select select-bordered w-full max-w-sm"  {...register('importance')} >
              {Object.keys(Importance).map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <select id="frequency" className="select select-bordered w-full max-w-sm"  {...register('frequency')}>
              {Object.keys(Frequency).map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="season" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suggested Season</label>
            <select id="season" className="select select-bordered w-full max-w-sm"  {...register('season')}>
              {Object.keys(Season).map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <button className="btn btn-primary mr-4" type='submit'>Create</button>
          <button className="btn btn-ghost" type='reset'>Reset</button>
     </form>
     </div>
     </div>
   )
 }

 export default NewTaskPage