import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '../share/Form/Input';
import Button from '../share/Button';

export default function NewsLetter() {
  const formSchema = Yup.object().shape({
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: 'Email is incorrect',
    }),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  function addToNewsLetter() {}
  return (
    <div>
      <div className="mb-6">
        Join Lenous Blog to stay up to date on features and releases.
      </div>
      <form className="w-full " onSubmit={handleSubmit(addToNewsLetter)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="flex-1 px-3 mb-6 ">
            <Input
              className="bg-transparent border-neutral-light placeholder-neutral-light text-neutral-light"
              register={register}
              errors={errors}
              name="email"
              placeholder="enter your email"
              type="email"
              required
            />
          </div>
          <div className="text-left">
            <Button
              shape="primary"
              className="bg-primary text-white "
              type="submit"
              label="Subscribe"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
