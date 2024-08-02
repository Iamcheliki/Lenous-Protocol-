import React from 'react';
import SelectOption from '../share/SelectOption';

export default function TimeInfForce() {
  const options = [
    { value: 'Good Til Time', label: 'Good Til Time' },
    { value: 'Immediate Or Cancel', label: 'Immediate Or Cancel' },
  ];

  const handleSelectChange = () => {};
  return (
    <div>
      <SelectOption
        options={options}
        onChange={handleSelectChange}
        label={'Time in Force'}
      />
    </div>
  );
}
