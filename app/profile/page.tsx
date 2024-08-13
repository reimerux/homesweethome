import React from 'react'
import ProfileInfo from '../components/ProfileInfo'
import Link from 'next/link'

const ProfilePage = () => {
  return (
    <div className='p-3'><h1>Profile</h1>
    <div className='mb-6'>You are logged in as <ProfileInfo /></div>
    <Link className="btn btn-primary" href="/api/auth/signout">Signout</Link>
    </div>
  )
}

export default ProfilePage