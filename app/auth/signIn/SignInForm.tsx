"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

interface SignInForm {
    email: string;
    password: string;
}

export default function SignInForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<SignInForm>();

    return (
        <>
            <form
                onSubmit={handleSubmit(async (data) => {

                    try {
                        const response: any = await signIn("credentials", {
                            data,
                            redirect: false,
                        });
                        console.log({ response });
                        if (!response?.error) {
                            router.push("/");
                            router.refresh();
                        }
            
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        // Process response here
                        console.log("Login Successful", response);
                        toast.success("Login Successful");
                    } catch (error: any) {
                        console.error("Login Failed:", error);
                        toast.error("Login Failed", error.message);
                    }

                })}
                className="text-white p-4 md:p-16 border-[1.5px] rounded-lg border-gray-300 flex flex-col items-center justify-center gap-y-6"
            >
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" className="input input-bordered w-full max-w-xs"  required {...register('email')} />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" className="input input-bordered w-full max-w-xs"  required {...register('password')} />
                </div>
               
                <button
                    type="submit"
                    className="hover:scale-110 hover:bg-cyan-700"
                >
                    Sign In
                </button>
            </form>
        </>
    );
}