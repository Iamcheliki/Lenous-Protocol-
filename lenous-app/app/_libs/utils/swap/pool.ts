import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { ethers } from 'ethers';
import { zeroAddress } from 'viem';
import { POOL_FACTORY_CONTRACT_ADDRESS } from '../constants/swapConstants';

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  sqrtPriceX96: ethers.BigNumber;
  liquidity: ethers.BigNumber;
  tick: number;
}

export async function getPoolInfo(
  provider: ethers.providers.BaseProvider,
  tokenA: Token,
  tokenB: Token
): Promise<PoolInfo | undefined> {
  if (!provider) {
    throw new Error('No provider');
  }

  const poolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: tokenA,
    tokenB: tokenB,
    fee: FeeAmount.MEDIUM,
  });
  if (!poolAddress || poolAddress === zeroAddress) {
    console.error('No pool found for the token pair');
    return;
  }

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI.abi,
    provider
  );

  const [token0, token1, fee, liquidity, slot0] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  return {
    token0,
    token1,
    fee,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}
