'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Md1kPlus, MdHouse } from "react-icons/md";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [{ href: "/dashboard", label: "Dashboard" },
  { href: "/alltasks", label: "All Tasks" },
  { href: "/history", label: "History" },
  { href: "/schedule", label: "Schedule" }];

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/" ><MdHouse /> </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className='flex  space-x-6'>
        {links.map(link =>
          <li key={link.href}><Link className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-900 mr-5`} href={link.href} >{link.label}</Link></li>)}
      </ul>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Md1kPlus/>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
            </a>
          </li>
          <li><a href="/admin">Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar