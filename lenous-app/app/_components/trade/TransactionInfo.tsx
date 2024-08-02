import React from 'react';

export default function TransactionInfo({
  submitOrder,
}: {
  submitOrder: () => void;
}) {
  return (
    <div>
      <div className="py-4 px-2 bg-white-bg-05 rounded-2xl mt-4">
        <div className="flex justify-between">
          <div className="text-neutral-light font-light italic">
            Expected Price
          </div>
          <div>-</div>
        </div>
        <div className="flex justify-between leading-9">
          <div className="text-neutral-light font-light italic">
            Position Margin
          </div>
          <div>-</div>
        </div>
        <div className="flex justify-between leading-9">
          <div className="text-neutral-light font-light italic">
            Position Leverage
          </div>
          <div>-</div>
        </div>
        <div className="flex justify-between leading-9">
          <div className="text-neutral-light font-light italic">
            Estimated Rewards
          </div>
          <div>-</div>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={submitOrder}
          className="px-4 py-2 text-lg italic bg-primary-15 w-full text-white rounded-2xl shadow-sm mt-4 "
        >
          Place Market Order
        </button>
      </div>
    </div>
  );
}
