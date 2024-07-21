'use client';
import React from 'react';
import NewsLetter from './NewsLetter';
import { menuItems } from '@/app/_libs/utils/constants/footerMenus';
import Icon from '../UI/icon';
import Link from 'next/link';
import RightsFooter from './RightsFooter';

export default function Footer() {
  return (
    <>
      <div className="flex gap-20 items-start text-white container pt-32">
        <div className="w-[440px]">
          <NewsLetter />
        </div>
        <div className="flex flex-grow justify-between ">
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <h4 className="font-bold leading-8 pb-2">{menuItem.title}</h4>
              <ul>
                {menuItem.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex} className="font-light py-2 leading-7">
                    <Link href={submenuItem.link} className="flex items-center">
                      {submenuItem.iconName && (
                        <div className="pr-2">
                          <Icon name={submenuItem.iconName} />
                        </div>
                      )}
                      {submenuItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <RightsFooter />
    </>
  );
}
