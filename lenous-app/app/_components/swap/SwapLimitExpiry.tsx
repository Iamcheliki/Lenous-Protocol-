import React from 'react';

type Expiry = {
  title: string;
  value: number;
};

interface Props {
  expiry: Expiry;
  changeExpiry: (expiry: Expiry) => void;
}

const SwapLimitExpiry: React.FC<Props> = ({ expiry, changeExpiry }) => {
  const ExpiryChoices = [
    { title: '1 Day', value: 1 },
    { title: '1 Week', value: 7 },
    { title: '1 Month', value: 30 },
    { title: '1 Year', value: 365 },
  ];

  return (
    <div className="flex mt-4">
      {ExpiryChoices.map((customExpiry) => (
        <div
          key={customExpiry.title}
          className={`${
            expiry?.title === customExpiry.title ? 'bg-third-layer-bg' : ''
          } text-white text-sm cursor-pointer border rounded-full border-neutral-light px-4 py-2 mr-2`}
          onClick={() => changeExpiry(customExpiry)}
        >
          {customExpiry.title}
        </div>
      ))}
    </div>
  );
};

export default SwapLimitExpiry;
