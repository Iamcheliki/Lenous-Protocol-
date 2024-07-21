'use client';
import React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import { tokenList } from '@/app/_libs/utils/constants/TokenList';
import SwapInput from './SwapInput';
import Icon from '../UI/icon';
import ModalTokensList from './ModalTokensList';
import SwapButton from './SwapButton';
import RatioInput from './RatioInput';
import CustomRatioChoices from './CustomRatioChoices';
import SwapLimitExpiry from './SwapLimitExpiry';

interface Token {
  id: string;
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
}
type CustomRatio = {
  title: string;
  value: number;
};
type Expiry = {
  title: string;
  value: number;
};

const LimitTab = () => {
  const [tokenOne, setTokenOne] = useState<Token>(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState<Token>(tokenList[1]);
  const [tokenOneAmount, setTokenOneAmount] = useState<number | string>('');
  const [tokenTwoAmount, setTokenTwoAmount] = useState<number | string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [changeToken, setChangeToken] = useState<number>(1);
  const [prices, setPrices] = useState<any>({});
  const [customRatio, setCustomRatio] = useState<number | string>('');
  const [selectedRatio, setSelectedRatio] = useState<CustomRatio | null>(null);
  const [expiry, setExpiry] = useState<Expiry>({ title: '1 Week', value: 7 });

  const fetchPrices = async () => {
    try {
      const [TokenOneRes, TokenTwoRes] = await Promise.all([
        fetch(`https://api.coincap.io/v2/assets/${tokenOne.id}`),
        fetch(`https://api.coincap.io/v2/assets/${tokenTwo.id}`),
      ]);

      const dataOne = await TokenOneRes.json();
      const tokenOnePrice = parseFloat(dataOne.data.priceUsd).toFixed(4);

      const dataTwo = await TokenTwoRes.json();
      const tokenTwoPrice = parseFloat(dataTwo.data.priceUsd).toFixed(4);

      if (parseFloat(tokenTwoPrice) !== 0) {
        const usdPrices = {
          tokenOne: tokenOnePrice,
          tokenTwo: tokenTwoPrice,
          // ratio: parseFloat(tokenOnePrice) / parseFloat(tokenTwoPrice),
        };
        setCustomRatio(parseFloat(tokenOnePrice) / parseFloat(tokenTwoPrice));
        setPrices(usdPrices);
        // updateTokenTwoAmount(tokenOneAmount, usdPrices);
      } else {
        console.warn('TokenTwo price is zero, skipping ratio calculation');
      }
    } catch (error) {
      console.error('Error fetching token prices:', error);
    }
  };

  useEffect(() => {
    fetchPrices();

    const ws = new WebSocket(
      'wss://ws.coincap.io/prices?assets=' + tokenOne.id + ',' + tokenTwo.id
    );

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices((prevPrices: any) => {
        const updatedPrices = { ...prevPrices };

        if (data[tokenOne.id]) {
          updatedPrices.tokenOne = parseFloat(data[tokenOne.id]).toFixed(4);
        }

        if (data[tokenTwo.id]) {
          updatedPrices.tokenTwo = parseFloat(data[tokenTwo.id]).toFixed(4);
        }

        // updatedPrices.ratio =
        //   parseFloat(updatedPrices.tokenOne) /
        //   parseFloat(updatedPrices.tokenTwo);

        // Call the update function to ensure tokenTwoAmount is updated correctly

        return updatedPrices;
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [tokenOne, tokenTwo]);

  useEffect(() => {
    if (
      tokenOneAmount !== '' &&
      prices &&
      customRatio !== undefined &&
      parseFloat(customRatio) !== 0
    ) {
      const amountNumber = parseFloat(tokenOneAmount as string);
      setTokenTwoAmount(
        (amountNumber * parseFloat(customRatio)).toFixed(6).toString()
      );
    } else {
      setTokenTwoAmount('');
    }
  }, [tokenOneAmount, prices, tokenOne, customRatio]);

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
  const changeRatioInput = (e: ChangeEvent<HTMLInputElement>) => {
    let ratio = e.target.value;
    const re = /^[0-9]*\.?[0-9]*$/;

    if (ratio === '' || re.test(ratio)) {
      setCustomRatio(ratio);
    }
  };

  const changeRatio = (ratio: CustomRatio) => {
    setCustomRatio((prevRatio) => parseFloat(String(prevRatio)) * ratio.value);
    setSelectedRatio(ratio);
  };
  const changeExpiry = (expiry: Expiry) => {
    setExpiry(expiry);
  };
  changeExpiry;

  return (
    <div className="p-8">
      <div className="mb-16">
        <RatioInput
          tokenOne={tokenOne}
          tokenTwo={tokenTwo}
          tokensRatio={customRatio}
          onChange={changeRatioInput}
        />
        <CustomRatioChoices
          selectedRatio={selectedRatio}
          changeRatio={changeRatio}
        />
      </div>

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
      <div className="mt-16">
        <p className="text-white">Expiry</p>
        <SwapLimitExpiry expiry={expiry} changeExpiry={changeExpiry} />
      </div>

      <SwapButton />
    </div>
  );
};

export default LimitTab;
