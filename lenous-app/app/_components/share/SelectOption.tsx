import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (value: string) => void;
  label?: string;
}

const SelectOption: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  label,
}) => {
  const [selected, setSelected] = useState<Option | null>(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex items-center w-full">
      <div
        className="bg-white-bg-05 px-4  py-2 cursor-pointer rounded-2xl w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label && (
          <div className="text-neutral-light font-extralight italic">
            {label}
          </div>
        )}

        <div className="text-white">
          {selected ? selected.label : 'Select an option'}
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 top-0 w-full bg-white-bg-30 text-white backdrop-blur-md rounded-2xl shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-primary-15 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectOption;
