import React from 'react'

const loading = () => {
  return (
    <div className='p-3 bg-slate-100'>
      <div className="flex w-full gap-4">
        <div className='hidden sm:block max-w-80'>
          <div className="mt-6 p-8 rounded-2xl bg-white">
            <div className="skeleton h-72 w-20"></div>
          </div>
        </div>
        <div className="flex-col max-w-3xl mx-auto">
          <div className="skeleton mb-4 h-8 w-20"></div>
          <div aria-label="card" className="mt-6 p-8 rounded-2xl bg-white max-w-4xl shadow-md w-full">
            <div aria-label="content" className="mt-9 grid gap-2.5">
              <div className="skeleton h-48 w-48" />
              <div className="skeleton h-48 w-48" />
            </div>
          </div>
          <div aria-label="card" className="mt-6 p-8 rounded-2xl bg-white max-w-4xl shadow-md w-full">
            <div className="skeleton mb-4 h-72 w-80" />
            <div className="skeleton mb-4 h-72 w-80" />
            <div className="skeleton mb-4 h-72 w-80" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading