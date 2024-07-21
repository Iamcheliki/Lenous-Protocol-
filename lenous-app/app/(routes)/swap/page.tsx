import Tabs from '@/app/_components/share/Tabs';
import Image from 'next/image';
import React from 'react';
import LimitTab from '@/app/_components/swap/LimitTab';
import SwapTab from '@/app/_components/swap/SwapTab';
import Script from 'next/script';

export default function Swap() {
  const tabs = [
    {
      id: '1',
      label: 'Swap',
      content: SwapTab,
    },
    {
      id: '2',
      label: 'Limit',
      content: LimitTab,
    },
  ];
  return (
    <div>
      <div className="topBanner ">
        <Image
          src="/images/swap-header.jpg"
          alt="start strading"
          width={1920}
          height={250}
        />
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
