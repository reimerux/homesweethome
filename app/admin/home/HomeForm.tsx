'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface HomeForm {
    houseId: number;
    street: string;
    city: string;
    sqfootage: number;

}

type Props = {
    home: any,
    id: number
}

const HomeForm = ({home, id}: Props) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<HomeForm>();
    return (
        <>
            <form className='max-w-m mx-auto' onSubmit={handleSubmit(async (data) => {
                await axios.put('/api/house/', data);
                router.push("/admin/home");
                toast.success("Home Info updated");
                
            })
            }>
                <h1>Edit Home Information</h1>
                <div className="mb-5">
                    <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street Address</label>
                    <input type="text" id="street" className='input input-bordered w-full max-w-xs' defaultValue={home.street} {...register('street')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" id="city" className='input input-bordered w-full max-w-xs' defaultValue={home.city}{...register('city')} />
                </div>
                <button className="btn btn-primary mr-4" type='submit'>Change</button>
                <button className="btn btn-ghost" type='reset'>Reset</button>
                <button className="btn btn-ghost" type="button" onClick={() => router.back()}>Back</button>
            </form>
        </>
    )
}

export default HomeForm