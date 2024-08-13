import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SignOutPage = async () => {

    const session = await getServerSession();
    console.log({ session });
  
    // if (session) {
    //   redirect("/");
    // }


  return (
    <div className='p=3'>
        <h1>SignOutPage
        </h1>
        
    </div>
  )
}

export default SignOutPage