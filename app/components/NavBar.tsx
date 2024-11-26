// 'use client'
import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = async () => {
  // const currentPath = usePathname();
  const session = await auth()

  const links = [
    { href: "/tasks/all", label: "Tasks" },
    { href: "/issues/pending", label: "Issues" },
    { href: "/inventory", label: "Inventory" },
    { href: "/byroom?roomSelected=1", label: "By Room" },
    { href: "/calendar", label: "Calendar" },
    { href: "/analytics", label: "Analytics" },];

  return (
    <div className="navbar bg-base-300">

      {session && session.user ?

        (<>
        <div className="flex-1">
          <a className="btn bg-white text-xl hover:bg-white" href="/dashboard" aria-label='Dashboard'><Image width={32} height={32} src="/home-icon-front-side-with-white-background.jpg" alt="logo" /> </a>
        </div>
          <div className="navbar-center hidden sm:flex">
            <ul className='flex space-x-6'>
              {links.map(link =>
                <li key={link.href}><Link className="text-zinc-500 hover:text-zinc-900 mr-5" href={link.href} aria-label={link.label}>{link.label}</Link></li>)}
              {/* <li key={link.href}><Link className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-900 mr-5`} href={link.href} >{link.label}</Link></li>)} */}
            </ul>
          </div>
          <div className="dropdown dropdown-end sm:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
              Menu
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100  z-[1] mt-3 w-max p-2 shadow">
              {links.map(link =>
                <li key={link.href}><a className="text-zinc-500 hover:text-zinc-900 mr-5" href={link.href} >{link.label}</a></li>)}
              {/* <li key={link.href}><a className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-900 mr-5`} href={link.href} >{link.label}</a></li>)} */}
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label='Avatar'>
              <div className="w-10 rounded-full bg-cyan-700 text-white content-center">
                {session.user.name}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100  z-[1] mt-3 w-max p-2 shadow">
              <li>
                <a href="/profile" aria-label='Profile'>Profile</a>
              </li>
              {(session.user.role==="ADMIN") ? (<li>
                <a href="/admin" aria-label='Settings'>Settings</a>
              </li>): null}
              <li>
                <form action={async () => {
                  "use server";
                  await signOut()
                }}>
                  <button type="submit" aria-label='SignOut'>Sign Out</button></form>
              </li>
            </ul>
          </div>
        </>) :

        (<div className='ml-auto'><form action={async () => {
          "use server";
          await signIn()
        }}>
          <button type="submit" aria-label='SignIn'>Sign In</button></form></div>)}

    </div>
  )
}

export default NavBar