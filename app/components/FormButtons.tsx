import { useRouter } from 'next/navigation';
import React from 'react'
import { classNames } from './URfunctions';

type Props = {
    SubmitText: string | null;
    isSubmitting: boolean;
}

const FormButtons = ({ isSubmitting, SubmitText }: Props) => {
    const router = useRouter();
    if (!SubmitText) { SubmitText = "Submit" };
    return (
        <>
            <button className={classNames((SubmitText==="Delete") && "btn-error", "btn mr-4 btn-primary")} disabled={isSubmitting} type='submit'><span className={(isSubmitting) ? "loading loading-spinner" : "hidden"}> </span>{SubmitText}</button>
            <button className={classNames((SubmitText==="Delete") && "hidden", "btn btn-ghost")} type='reset'>Reset</button>
            <button className="btn btn-ghost" type='button' onClick={() => router.back()}>Back</button>
        </>
    )
}

export default FormButtons