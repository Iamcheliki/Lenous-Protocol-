'use client';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from '@/app/_libs/utils/ethers';
import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';
import Modal from '@/app/_components/share/Modal'; // Adjust the import path as needed

const AccountMargin: React.FC = () => {
  const ORDERBOOK_ADDRESS = '0xe9FFa35fA2b2fa777721B7FFA37ad89299411660';
  const [amount, setAmount] = useState<number>(0);
  const [marginType, setMarginType] = useState<number>(0);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const handleDeposit = async () => {
    try {
      const contract = new ethers.Contract(
        ORDERBOOK_ADDRESS,
        OrderbookABI,
        signer || provider
      );

      const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6);

      console.log(`Parsed Amount: ${parsedAmount.toString()}`);
      console.log(`Margin Type: ${marginType}`);

      const tx = await contract.depositMargin(parsedAmount, marginType);
      console.log(`Transaction Hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log('Transaction Receipt:', receipt);

      if (receipt.status === 1) {
        console.log('Transaction Successful');
      } else {
        console.error('Transaction Failed');
      }
    } catch (error) {
      console.error('Error in depositMargin:', error);
    } finally {
      setIsDepositModalOpen(false);
    }
  };

  const handleWithdraw = async () => {};

  return (
    <div className="bg-green-linear-gradient-180">
      <div className="flex items-center justify-between p-6">
        <div className="text-white mr-4 flex">
          <div className="px-4 py-2 bg-white-bg-05 text-white rounded-xl shadow-sm text-sm mr-4">
            chart
          </div>
          <div className="px-4 py-2 bg-white-bg-05 text-white rounded-xl shadow-sm text-sm ">
            LE chart
          </div>
        </div>
        <div>
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="px-4 py-2  bg-white-bg-05 text-white rounded-xl shadow-sm  text-sm mr-2"
          >
            Deposit
          </button>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="px-4 py-2 bg-white-bg-05 text-white rounded-xl shadow-sm text-sm "
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Deposit Modal */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Deposit Margin"
      >
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm text-white font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 text-white block w-full bg-transparent px-3 py-2 border border-white rounded-md shadow-sm  focus:border-white  focus:border sm:text-sm"
            placeholder="Enter amount"
          />
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="marginType"
            className="block text-sm text-white font-medium text-gray-700"
          >
            Margin Type
          </label>
          <select
            id="marginType"
            value={marginType}
            onChange={(e) => setMarginType(Number(e.target.value))}
            className="mt-1 text-white bg-transparent block w-full px-3 py-2 border border-white focus:border-white rounded-md shadow-sm sm:text-sm"
          >
            <option className="bg-transparent" value={0}>
              Cross
            </option>
            <option value={1}>Isolated</option>
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleDeposit}
            className="px-4 py-1 mt-4 bg-transparent border border-white text-white rounded-xl shadow-sm "
          >
            Deposit
          </button>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        title="Withdraw"
      >
        <div className="mb-4 ">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-white"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 block w-full text-white border border-white bg-transparent px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleWithdraw}
            className="px-4 py-1 bg-transparent border border-white text-white rounded-xl shadow-sm "
          >
            Withdraw
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountMargin;
