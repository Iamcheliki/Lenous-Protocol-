'use client';
import React from 'react';
import Icon from '../UI/icon';

export default function CheckUserConnection() {
  return (
    <div className="flex w-44 text-good-condition items-center">
      <Icon name="connection" />
      <span className="pl-2 ">stable connection</span>
    </div>
  );
}
