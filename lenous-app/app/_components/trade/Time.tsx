import React from 'react';
import SelectOption from '../share/SelectOption';

export default function Time() {
  const options = [
    { value: 'Days', label: 'Days' },
    { value: 'Mins', label: 'Mins' },
    { value: 'Hours', label: 'Hours' },
    { value: 'Weeks', label: 'Weeks' },
  ];

  const handleSelectChange = () => {};
  return (
    <div className="flex bg-white-bg-05 py-2 px-4 rounded-2xl">
      <div>
        <div className="text-neutral-light font-extralight italic">Time</div>
        <input
          type="text"
          value={28}
          className="inline-block w-16 bg-transparent text-white"
        />
      </div>
      <SelectOption options={options} onChange={handleSelectChange} />
    </div>
  );
}
