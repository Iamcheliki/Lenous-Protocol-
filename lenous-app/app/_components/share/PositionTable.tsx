'use client';
import React from 'react';
import PositionTableRow from './PositionTableRow';

export default function PositionTable() {
  return (
    <table className="w-full text-left text-white ">
      <thead>
        <tr className="border-b border-neutral-button leading-9">
          <th>Token name</th>
          <th>Price</th>
          <th>1 hour</th>
          <th>1 day</th>
          <th>FDV</th>
          <th>Volume</th>
          <th>chart</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <PositionTableRow />
      </tbody>
    </table>
  );
}
