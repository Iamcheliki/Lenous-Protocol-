'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { tokenList } from '@/app/_libs/utils/constants/TokenList';
import SwapInput from './SwapInput';
import ModalTokensList from './ModalTokensList';
import SwapButton from './SwapButton';
import Icon from '../UI/icon';
import { ChainId } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from '@/app/_libs/utils/ethers';
import { useAccount } from 'wagmi';
import {
  networkData,
  NetworkName,
} from '@/app/_libs/utils/constants/swapConstants';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import fromReadableAmount from '@/app/_libs/utils/swap/fromReadableAmount';
import {
  getTokenTransferApproval,
  TransactionState,
} from '@/app/_libs/utils/swap/getTokenTransferApproval';
import executeSwap from '@/app/_libs/utils/swap/executeSwap';

const SwapTab = () => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [tokenOneAmount, setTokenOneAmount] = useState<number | string>('1');
  const [tokenTwoAmount, setTokenTwoAmount] = useState<number | string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [changeToken, setChangeToken] = useState<number>(1);
  const [prices, setPrices] = useState<any>({});
  const { address, chainId } = useAccount();
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const [network, setNetwork] = useState<NetworkName>('mainnet');

  const approveAndSwap = async () => {
    if (!provider || !signer || !address) {
      console.error('Provider or signer is not available');
      return;
    }
    let tokenOneAmountNumber: number;

    if (typeof tokenOneAmount === 'string') {
      tokenOneAmountNumber = parseFloat(tokenOneAmount);
      if (isNaN(tokenOneAmountNumber)) {
        throw new Error('Invalid tokenOneAmount, it must be a number.');
      }
    } else {
      tokenOneAmountNumber = tokenOneAmount;
    }

    // Request approval
    const approvalStatusTokenOne = await getTokenTransferApproval(
      data.tokens.tokenA,
      tokenOneAmountNumber,
      provider,
      data.V3_SWAP_ROUTER_ADDRESS,
      signer,
      address
    );
    if (approvalStatusTokenOne === TransactionState.Success) {
      // Proceed with swapping only if the approval is successful
      await executeSwap(
        provider,
        signer,
        address,
        data.tokens.tokenA,
        data.tokens.tokenB,
        tokenOneAmountNumber,
        data.V3_SWAP_ROUTER_ADDRESS
      );
    } else {
      console.error('Token approval failed');
    }
  };

  useEffect(() => {
    if (chainId) {
      setNetwork(chainId === ChainId.MAINNET ? 'mainnet' : 'sepolia');
    }
  }, [chainId]);

  const data = networkData[network];

  useEffect(() => {
    fetchPrices();
  }, [tokenOne, tokenTwo]);

  useEffect(() => {
    if (
      tokenOneAmount !== '' &&
      prices &&
      prices.ratio !== undefined &&
      parseFloat(prices.ratio) !== 0
    ) {
      const amountNumber = parseFloat(tokenOneAmount as string);
      setTokenTwoAmount(
        (amountNumber * parseFloat(prices.ratio)).toFixed(6).toString()
      );
    } else {
      setTokenTwoAmount('');
    }
  }, [tokenOneAmount, prices, tokenOne]);

  const fetchPrices = async () => {
    if (!provider) return;

    const quoterContract = new ethers.Contract(
      data.QUOTER_CONTRACT_ADDRESS,
      Quoter.abi,
      provider
    );

    try {
      const amountIn = fromReadableAmount(1, tokenOne.decimals); // 1 token in smallest unit

      // Single pool quote for tokenOne to tokenTwo
      const quoteTokenOneToTwo =
        await quoterContract.callStatic.quoteExactInputSingle(
          tokenOne.address,
          tokenTwo.address,
          FeeAmount.MEDIUM, // Fee tier
          amountIn.toString(),
          0 // No price limit
        );

      // Format quotes
      const tokenOneToTwoPrice = parseFloat(
        ethers.utils.formatUnits(quoteTokenOneToTwo, tokenTwo.decimals)
      );

      // Determine if either token is USDC
      const isTokenOneUSDC = tokenOne.symbol === 'USDC';
      const isTokenTwoUSDC = tokenTwo.symbol === 'USDC';

      let tokenTwoToOnePrice = 1 / tokenOneToTwoPrice;

      // If tokenTwo is USDC, set its price as 1 (since USDC should be close to 1 USD)
      const tokenTwoPriceAdjusted = isTokenTwoUSDC
        ? 1
        : tokenTwoToOnePrice.toFixed(4);

      // If tokenOne is USDC, adjust the tokenOneToTwoPrice to be close to 1 USD
      const tokenOnePriceAdjusted = isTokenOneUSDC
        ? 1
        : tokenOneToTwoPrice.toFixed(4);

      setPrices({
        tokenOne: tokenOnePriceAdjusted,
        tokenTwo: tokenTwoPriceAdjusted,
        ratio: tokenOneToTwoPrice.toFixed(4),
      });
    } catch (error) {
      console.error('Error fetching token prices:', error);
    }
  };

  const onChangeTokenInput = (e: ChangeEvent<HTMLInputElement>) => {
    let amount = e.target.value;
    const re = /^[0-9]*\.?[0-9]*$/;

    if (amount === '' || re.test(amount)) {
      setTokenOneAmount(amount);
    }
  };

  const changeSwapToken = (assetNumber: number) => {
    setIsOpen(true);
    setChangeToken(assetNumber);
  };

  const modifyToken = (i: number) => {
    clearTokenInput();
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setIsOpen(false);
  };

  const switchTokens = () => {
    clearTokenInput();
    const tempToken = tokenOne;
    setTokenOne(tokenTwo);
    setTokenTwo(tempToken);
  };

  const clearTokenInput = () => {
    setTokenOneAmount('');
    setTokenTwoAmount('');
  };

  return (
    <div className="p-8">
      <SwapInput
        token={tokenOne}
        tokenWraptitle="You pay"
        tokenAmount={tokenOneAmount}
        clearAction={clearTokenInput}
        onChange={onChangeTokenInput}
        disable={false}
        changeToken={() => changeSwapToken(1)}
        tokenPrice={prices.tokenOne}
      />
      <div className="switchTokens flex justify-center" onClick={switchTokens}>
        <div className="border border-neutral-light p-2 rounded-full -mt-2">
          <Icon name="switchToken" />
        </div>
      </div>
      <SwapInput
        token={tokenTwo}
        tokenWraptitle="You receive"
        tokenAmount={tokenTwoAmount}
        clearAction={clearTokenInput}
        disable={true}
        changeToken={() => changeSwapToken(2)}
        tokenPrice={prices.tokenTwo}
      />
      <ModalTokensList
        isOpen={isOpen}
        modifyToken={modifyToken}
        closeModal={() => setIsOpen(false)}
      />
      <SwapButton executeSwap={approveAndSwap} />
    </div>
  );
};

export default SwapTab;
