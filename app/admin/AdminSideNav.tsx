import Link from 'next/link'
import { env } from 'process'
import React from 'react'
import { MdBackup, MdBedroomParent, MdChecklist, MdHomeFilled, MdOutlineWarningAmber, MdPerson, MdSuperscript } from 'react-icons/md'

const Menu = [
  {"title": "Users", "link": "/admin/users/", "icon": <MdPerson />},
  {"title": "Tasks", "link": "/admin/tasks", "icon": <MdChecklist />},
  {"title": "Home Info", "link": "/admin/home", "icon": <MdHomeFilled />},
  {"title": "Rooms", "link": "/admin/rooms", "icon": <MdBedroomParent />},
  {"title": "Backup/Restore", "link": "/admin/backup", "icon": <MdBackup />},
  {"title": "Reset", "link": "/admin/preload", "icon": <MdOutlineWarningAmber />}
]

const AdminSideNav = () => {
  return (
    <>
      <div className='flex flex-col flex-auto flex-shrink-0 bg-gray-50 text-gray-800 gap-2 p-2 min-w-40 max-w-56'>
      <div className="flex items-center justify-center h-14 border-b">Settings</div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        {Menu.map((item,i) => 
          <li key={i}>
          <a href={item.link} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              {item.icon}
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">{item.title}</span>
          </a>
        </li>
         )}
         </ul>
      </div>
      </div>
    </>
  )
}

export default AdminSideNav