import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import Icon from '../UI/icon';

interface Token {
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
}
interface props {
  tokenOne: Token;
  tokenTwo: Token;
  tokensRatio: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RatioInput: React.FC<props> = ({
  tokenOne,
  tokenTwo,
  tokensRatio,
  onChange,
}) => {
  return (
    <div>
      <div className="tokenSwapWrap text-white">
        <div className="flex justify-between bg-third-layer-bg p-4 rounded-xl">
          <div className="flex justify-start w-56">
            <Image
              src={tokenOne.img}
              alt={tokenOne.name}
              width="64"
              height="64"
            />
            <div className="pl-4 cursor-pointer flex items-center">
              <div className="text-neutral-light">
                <span className="text-white">{`1 ${tokenOne.name}`}</span> Worth
              </div>
            </div>
          </div>
          <input
            placeholder="0"
            className="bg-transparent justify-center text-center flex-grow text-xl text-white"
            value={tokensRatio}
            pattern="[0-9]*\.?[0-9]*"
            onChange={onChange}
          />
          <div className="flex justify-end w-56">
            <Image
              src={tokenTwo.img}
              alt={tokenTwo.name}
              width="64"
              height="64"
            />
            <div className="pl-4 cursor-pointer flex items-center">
              <div className="text-neutral-light ">{tokenTwo.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RatioInput;
