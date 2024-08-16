'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Frequency, Importance, Season, Status } from '@prisma/client';
import toast from 'react-hot-toast';
import ImportancePicker from '@/app/components/ImportancePicker';

interface IssueForm {
  issueId: number; title: string; description: string | null;
  created_at:  Date;
  updated_at:  Date;
  status:      Status;
  priority:    Importance;
}

 const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<IssueForm>();

   return (
    <div className='p-3'>
    <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
      const newissue = await axios.post('../../api/issues',data);
      router.push("/issues/pending");
      router.refresh();
      toast.success("New Issue " + newissue.data.issueId + " - '" + newissue.data.title.substring(0,10) + "' created");
    })
      }>
      <h1>Create Issue</h1>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
            <input type="text" id="title" className='input input-bordered w-full' placeholder="Task Name" {...register('title')} />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
            <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" {...register('description')} />
          </div>
          <div className="mb-5 max-w-sm">
                   <ImportancePicker defaultValue={"LOW"} register={register("priority", { setValueAs: v => Object.values(Importance)[v], })}/>
                </div>
          <input className="hidden" id="status" value="PENDING" {...register('status')}/>
          <button className="btn btn-primary mr-4" type='submit'>Create</button>
          <button className="btn btn-ghost" type='reset'>Reset</button>
          <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
     </form>
     </div>
   )
 }

 export default NewTaskPage