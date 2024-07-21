'use client';
import React from 'react';
import Icon from '../UI/icon';
import Limit from './Limit';
import Market from './Market';
import StopLimit from './StopLimit';
import { useState } from 'react';

export default function TradeMenu() {
  const [activeMenu, setActiveMenu] = useState(0);

  const menuItems = [
    // {
    //   id: 1,
    //   name: 'limit',
    //   icon: 'limit',
    //   content: <Limit />,
    // },
    {
      id: 2,
      name: 'market',
      icon: 'market',
      content: <Market />,
    },
    {
      id: 3,
      name: 'Stop Limit',
      icon: 'stopLimit',
      content: <StopLimit />,
    },
    {
      id: 4,
      name: 'Order Book',
      icon: 'orderBook',
      content: <div>Order Book Component</div>,
    },
    {
      id: 5,
      name: 'Trades',
      icon: 'trades',
      content: <div>Trades Component</div>,
    },
    {
      id: 6,
      name: 'Margin Ratio',
      icon: 'marginRatio',
      content: <div>Margin Ratio Component</div>,
    },
    {
      id: 7,
      name: 'Assets',
      icon: 'assets',
      content: <div>Assets Component</div>,
    },
    {
      id: 8,
      name: 'Help',
      icon: 'help',
      content: <div>Help Component</div>,
    },
  ];
  return (
    <>
      <div className="activeMenu bg-dark-gray py-9 px-6">
        {menuItems.find((item) => item.id === activeMenu)?.content}
      </div>
      <div className="w-24 bg-light-gray py-9 h-full flex justify-center">
        <div className="inline">
          {menuItems.map((item, index) => (
            <div
              className={`flex justify-end pointer-cursor  ${
                index == 2 || index == 4 ? 'mb-14' : 'mb-9'
              }`}
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
            >
              {/* <div className="text-white pr-2">{item.name}</div> */}
              <Icon name={item.icon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
