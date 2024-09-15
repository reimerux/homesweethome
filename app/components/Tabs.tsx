'use client'
import { useState } from 'react';


type Props = {
    items: Array<any>
}

const Tabs = ({items}: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex gap-8 border-b justify-center">
        {/* Loop through tab data and render button for each. */}
        {items.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? 'border-slate-500'
                  : 'border-transparent hover:border-gray-200'
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* Show active tab content. */}
      <div className="py-4">
        <div>{items[activeTabIndex].content}</div>
      </div>
    </div>
  );
}

export default Tabs
