'use client'
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const currentPath = usePathname();
  
  const links = [
    { href: "/alltasks?page=1&pagesize=10", label: "All Tasks" },
    { href: "/history", label: "History" },
    { href: "/calendar", label: "Calendar" },
    { href: "/schedule", label: "Schedule New Tasks" }];

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn bg-white text-xl hover:bg-white" href="/dashboard" ><Image width={32} height={32} src="/home-icon-front-side-with-white-background.jpg" alt="logo"/> </a>
      </div>
      <div className="navbar-center hidden sm:flex">
        <ul className='flex  space-x-6'>
          {links.map(link =>
            <li key={link.href}><Link className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-900 mr-5`} href={link.href} >{link.label}</Link></li>)}
        </ul>
      </div>
      <div className="flex-none sm:hidden">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Menu</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
              {links.map(link =>
              <li key={link.href}><Link className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-900 mr-5`} href={link.href} >{link.label}</Link></li>)}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-cyan-700 text-white content-center">
                    User
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-t-none z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/admin">Settings</a>
                </li>
                <li>
                    {/* <a href="/api/auth/signout">Signout</a> */}
                    <button onClick={() => signOut()}>SignOut</button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar