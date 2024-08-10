'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHouse } from "react-icons/md";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/alltasks?page=1&pagesize=10", label: "All Tasks" },
    { href: "/history", label: "History" },
    { href: "/schedule", label: "Schedule" }];

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/dashboard" ><MdHouse /> </a>
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
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-t-none z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a href="/admin">Settings</a>
            
      </li>
          <li>
            <a>Logout</a>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar