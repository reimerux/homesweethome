import React from 'react'
import Link from 'next/link'
import InventoryTable from './InventoryTable'
import { MdLocalPrintshop } from 'react-icons/md'

const Inventory = () => {
  return (
    
    
    <div className="flex-col p-3">
      <div className='flex'><h1>Inventory</h1>
      <a href="/inventory/print" target="_blank"
                    className="ml-12 inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
                    <MdLocalPrintshop />
                
                </a>
                </div>
      <div className='mb-5'><Link className="btn btn-sm" href="/inventory/new" >New Inventory Item</Link></div>
      <InventoryTable />
    </div>
  
  )
}

export default Inventory