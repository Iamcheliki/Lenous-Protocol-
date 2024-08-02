import React from 'react';
import { useState } from 'react';
import { useEthersProvider, useEthersSigner } from '@/app/_libs/utils/ethers';
import TransactionInfo from './TransactionInfo';
import { ethers } from 'ethers';
import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';

interface Props {
  marginType: number;
  leverage: number;
  actionType: 'buy' | 'sell';
}

const MarketOrder: React.FC<Props> = ({ marginType, leverage, actionType }) => {
  const [amount, setAmount] = useState<number>(5);
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const ORDERBOOK_ADDRESS = '0x33A5D5d8D89249e7d362AF7D46Df76F5C335F2e7';
  // limit orders **************************************
  const submitOrders = async () => {
    // Initialize contract instance
    const contract = new ethers.Contract(
      ORDERBOOK_ADDRESS,
      OrderbookABI,
      signer || provider
    );

    // Static data for the limit order
    const price = ethers.utils.parseUnits('3800', 6);
    const stopLossPrice = ethers.utils.parseUnits('3600', 6);
    const takeProfitPrice = ethers.utils.parseUnits('3900', 6);
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6);
    const isBuyOrder = actionType === 'buy';
    const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
    const gasLimit = ethers.utils.hexlify(1000000); //??

    try {
      const tx = await contract.placeLimitOrder(
        price,
        stopLossPrice,
        takeProfitPrice,
        parsedAmount,
        isBuyOrder,
        expiration,
        leverage,
        marginType,
        { gasLimit } // Set the gas limit for the transaction
      );

      // Wait for the transaction to be mined
      await tx.wait();

      console.log('Limit order placed successfully!');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };
  const submitOrder = async () => {
    // Initialize contract instance
    const contract = new ethers.Contract(
      ORDERBOOK_ADDRESS,
      OrderbookABI,
      signer || provider
    );

    const amount = 5;
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6);
    // Set gas limit (adjust as needed)
    const gasLimit = ethers.utils.hexlify(1000000);
    const isBuyOrder = false;
    const leverage = 1;
    const marginType = 0;
    try {
      // Call the contract function
      const tx = await contract.placeMarketOrder(
        parsedAmount,
        isBuyOrder,
        leverage,
        marginType,
        { gasLimit } // Set the gas limit for the transaction
      );

      // Wait for the transaction to be mined
      await tx.wait();

      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-neutral-light"
        >
          Amount
        </label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full px-4 py-3 rounded-2xl text-neutral-light shadow-sm bg-white-bg-05 sm:text-sm"
          placeholder="Enter amount"
        />
      </div>
      <TransactionInfo submitOrder={submitOrders} />
    </div>
  );
};
export default MarketOrder;
