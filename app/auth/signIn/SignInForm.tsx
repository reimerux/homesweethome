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
            {/* <form
                action={async (formData) => {
                    "use server"
                    try {
                        await signIn("credentials", formData)
                        router.push("/");
                        toast.success("Logged in as ...")
                    } catch (error) {
                        // if (error instanceof AuthError) {
                        //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                        // }
                        toast.error("Logging in not successful")
                        throw error
                    }
                }}
            >
                <label htmlFor="email">
                    Email
                    <input name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input name="password" id="password" />
                </label>
                <input type="submit" value="Sign In" />
            </form> */}
        </>
    );
}