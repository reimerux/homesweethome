'use client'
import CommentForm from '@/app/components/CommentForm';
import FormButtons from '@/app/components/FormButtons';
import ImportancePicker from '@/app/components/ImportancePicker';
import RoomMultiSelect from '@/app/components/RoomMultiSelect';
import { classNames, parseComments } from '@/app/components/URfunctions';
import { Importance, Status } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IssueForm {
    issueId: number; title: string; description: string | null;
    created_at: Date;
    updated_at: Date;
    status: Status;
    priority: Importance;
    notes: string | null;
    rooms: Array<number>;
    userId: number;
}

type Props = {
    currentIssue: any,
    id: number, allRooms: any, userId: string | undefined, username: string | null | undefined
}


const StatusOption = [ "COMPLETED", "PENDING", "CANCELLED"]

const IssueForm = ({ currentIssue, id, allRooms, userId, username }: Props) => {
    const [issueStatus, setIssueStatus] = useState(currentIssue.status)
    const [comments, setComments] = useState(parseComments(currentIssue.notes))
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm<IssueForm>();


    return (
        <>

            <form className='max-w-3xl mx-auto' onSubmit={handleSubmit(async (data) => {
                try {
                    console.log(data)
                    await axios.put('/api/issues/' + id, data);
                    router.push("/issues/pending");
                    router.refresh();
                    toast.success("Issue " + id + " updated");

                    if (userId) {
                        await axios.post('/api/achievements/', { "userId": userId }).then((res) => {
                            if (res.data) res.data.map((award: any) => toast((t: any) => {
                                return (
                                    <div className='w-48 h-48'>
                                        <Image
                                        src="/award.gif"
                                        width={128}
                                        height={128}
                                        fill={true}
                                        alt="Picture of the award"
                                      />
                                        <b>{award.name} achieved!</b><br />
                                        <button className="btn btn-ghost" onClick={() => toast.dismiss(t.id)}>
                                            Dismiss
                                        </button>
                                    </div>
                                )
                                
                            }))
                        })
                    }

                } catch (error) {
                    toast.error("Task failed " + error);
                    console.error(error);
                }
            })
            }>
                <h1>Edit Issue {currentIssue.issueId} <span className='text-sm font-light lowercase'>{issueStatus}</span></h1>
                <input className='hidden' {...register('userId')} value={userId} />
                <input className='hidden' {...register('status')} value={issueStatus} />
                <div className="mb-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="title" className='input input-bordered w-full' placeholder="Task Name" defaultValue={currentIssue.title} {...register('title')} />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea className="textarea textarea-bordered w-full" id="description" placeholder="Description" defaultValue={currentIssue.description}{...register('description')} />
                </div>
                <div className="mb-2 max-w-sm">
                    <ImportancePicker defaultValue={currentIssue.priority} register={register("priority", { setValueAs: v => Object.values(Importance)[2 - v], })} />
                </div>
                <div className="mb-2 max-w-sm">
                    <RoomMultiSelect register={register("rooms")} allRooms={allRooms} roomsSelected={currentIssue.rooms.map((room: any) => room.roomId.toString())} />
                </div>
                <CommentForm comments={comments} setComments={setComments} user={username} setValue={setValue}/>
                <div className="mb-1">
                    {StatusOption.map((status : any) => <button key={status} aria-label={status} className={classNames((status===issueStatus) && 'hidden',"btn btn-sm btn-outline")} type ="button" onClick={(e) => {setIssueStatus(status);setValue('status', status);}}>Set<span className='lowercase'>{status}</span></button>)}
                </div>
                <FormButtons isSubmitting={false} SubmitText="Save" />
            </form>
        </>
    )
}

export default IssueForm