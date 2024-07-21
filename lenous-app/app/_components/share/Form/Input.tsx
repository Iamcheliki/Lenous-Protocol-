import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormPutProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  type?: string;
  className?: String;
}

const Input: React.FC<FormPutProps> = (props) => {
  const {
    register,
    errors,
    name,
    label,
    required,
    placeholder,
    defaultValue,
    disabled,
    type,
    className,
  } = props;
  return (
    <>
      {label && (
        <label
          className="block uppercase tracking-wide text-xs font-bold mb-2 "
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type={type || 'text'}
        className={`appearance-none block w-full text-xs border border-light-gray-200 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none ${className} `}
        {...register(`${name}`)}
        defaultValue={defaultValue}
        placeholder={placeholder || label}
        disabled={disabled}
      />
      <p className="inputValidation text-xs text-red-800">
        {errors[name]?.message}
      </p>
    </>
  );
};
export default Input;
