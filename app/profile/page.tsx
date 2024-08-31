
import { signOut } from '@/auth'
import ProfileInfo from '../components/ProfileInfo'

const ProfilePage = () => {
  return (
    <div className='p-3' ><h1>Profile</h1>
    <div className='mb-6'>You are logged in as <ProfileInfo /></div>
    <form action={async () => {
                  "use server";
                  await signOut()
                }}>
                  <button className="btn btn-primary" type="submit">Sign Out</button></form>
    </div>
  )
}

export default ProfilePage