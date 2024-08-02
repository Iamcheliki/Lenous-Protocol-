import React from 'react';
import { useState } from 'react';
import TimeInfForce from './TimeInForce';
import Time from './Time';
import TransactionInfo from './TransactionInfo';

interface Props {
  margin: number;
  leverage: number;
  actionType: 'buy' | 'sell';
}
const submitOrder = () => {};
const LimitOrder: React.FC<Props> = () => {
  const [amount, setAmount] = useState<number>(0);
  const [limitPrice, setLimitPrice] = useState<number>(0);
  return (
    <div className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="limitPrice"
          className="block text-sm text-neutral-light font-medium "
        >
          Limit Price
        </label>
        <input
          id="limitPrice"
          type="text"
          placeholder="$0.0"
          value={limitPrice}
          onChange={(e) => setLimitPrice(Number(e.target.value))}
          className="mt-1 block w-full  px-4 py-3  rounded-2xl  text-neutral-light bg-white-bg-05 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm text-neutral-light font-medium "
        >
          Amount
        </label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full  px-4 py-3  rounded-2xl text-neutral-light bg-white-bg-05 sm:text-sm"
          placeholder="Enter amount"
        />
      </div>
      <div className="mt-6  ">
        <div className="text-white mb-4">Advanced</div>

        <div className="flex items-center justify-between ">
          <TimeInfForce />
          <Time />
        </div>
        <div className="transactionInfo">
          <TransactionInfo submitOrder={submitOrder} />
        </div>
      </div>
    </div>
  );
};
export default LimitOrder;
