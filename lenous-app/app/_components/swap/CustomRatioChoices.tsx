import React from 'react';

type CustomRatio = {
  title: string;
  value: number;
};

interface Props {
  selectedRatio: CustomRatio | null;
  changeRatio: (ratio: CustomRatio) => void;
}

const CustomRatioChoices: React.FC<Props> = ({
  selectedRatio,
  changeRatio,
}) => {
  const customRatios = [
    { title: 'market', value: 1 },
    { title: '+1%', value: 1.01 },
    { title: '+5%', value: 1.05 },
    { title: '+10%', value: 1.1 },
  ];

  return (
    <div className="flex mt-4">
      {customRatios.map((customeRa) => (
        <div
          key={customeRa.title}
          className={`${
            selectedRatio?.title === customeRa.title ? 'bg-third-layer-bg' : ''
          } text-white text-sm cursor-pointer border rounded-full border-neutral-light px-4 py-2 mr-2`}
          onClick={() => changeRatio(customeRa)}
        >
          {customeRa.title}
        </div>
      ))}
    </div>
  );
};

export default CustomRatioChoices;
