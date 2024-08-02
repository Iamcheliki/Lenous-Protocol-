'use client';
import React, { useState } from 'react';

interface Tab {
  id: number;
  label: string;
  content: React.FC;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  return (
    <div className="max-w-4xl mx-auto mt-24 bg-neutral-button  rounded-3xl overflow-hidden ">
      <div className="">
        <div className="inline-flex bg-neutral-button rounded-t-3xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-20 text-xl py-2 text-sm font-medium text-white focus:outline-none rounded-t-3xl ${
                activeTab === tab.id
                  ? 'bg-teal-bg  border-t-2  border-green-border'
                  : 'hover:text-blue-500 '
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[400px] bg-teal-bg">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? 'block' : 'hidden'}  h-full`}
          >
            <tab.content />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
