import JSBI from 'jsbi';
import {
  CurrencyAmount,
  TradeType,
  Percent,
  ChainId,
  Token,
} from '@uniswap/sdk-core';
import {
  Pool,
  Route,
  Trade,
  FeeAmount,
  SwapRouter,
  SwapOptions,
} from '@uniswap/v3-sdk';
import { ethers } from 'ethers';
import { getCurrentGasPrices } from '@/app/_libs/utils/swap/getCurrentGasPrices';
import { getPoolInfo } from '@/app/_libs/utils/swap/pool';
import { getOutputQuote } from '@/app/_libs/utils/swap/getOutputQuote';
import fromReadableAmount from '@/app/_libs/utils/swap/fromReadableAmount';

export default async function executeSwap(
  provider: ethers.providers.BaseProvider,
  signer: ethers.Signer,
  address: string,
  tokenA: Token,
  tokenB: Token,
  tokenOneAmount: number,
  swapRouter: string
) {
  if (!signer || !provider) {
    console.error('Signer or provider is not available');
    return;
  }

  if (address) {
    const balance = await provider.getBalance(address);
    console.log('ETH Balance:', ethers.utils.formatEther(balance));
  }

  const poolInfo = await getPoolInfo(provider, tokenA, tokenB);
  if (!poolInfo) {
    console.error('No pool found for the token pair');
    return;
  }

  const pool = new Pool(
    tokenA,
    tokenB,
    FeeAmount.MEDIUM,
    poolInfo.sqrtPriceX96.toString(),
    poolInfo.liquidity.toString(),
    poolInfo.tick
  );

  const route = new Route([pool], tokenA, tokenB);

  let tokenOneAmountNumber: number;

  if (typeof tokenOneAmount === 'string') {
    tokenOneAmountNumber = parseFloat(tokenOneAmount);
    if (isNaN(tokenOneAmountNumber)) {
      throw new Error('Invalid tokenOneAmount, it must be a number.');
    }
  } else {
    tokenOneAmountNumber = tokenOneAmount;
  }

  const quotedAmountOut = await getOutputQuote(
    route,
    tokenOneAmountNumber,
    tokenA,
    provider
  );

  const options: SwapOptions = {
    slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
    deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
    recipient: address!,
  };

  // createUncheckedTrade

  const uncheckedTrade = Trade.createUncheckedTrade({
    route: route,
    inputAmount: CurrencyAmount.fromRawAmount(
      tokenA,
      fromReadableAmount(tokenOneAmountNumber, 18).toString()
    ),
    outputAmount: CurrencyAmount.fromRawAmount(
      tokenB,
      JSBI.BigInt(quotedAmountOut)
    ),
    tradeType: TradeType.EXACT_INPUT,
  });

  const methodParameters = SwapRouter.swapCallParameters(
    [uncheckedTrade],
    options
  );
  const gasPrice = await getCurrentGasPrices(provider);
  const tx = {
    data: methodParameters.calldata,
    to: swapRouter,
    value: methodParameters.value,
    from: address,
    maxFeePerGas: gasPrice.mul(2),
    maxPriorityFeePerGas: gasPrice.div(2),
  };

  try {
    const txResponse = await signer.sendTransaction(tx);
    await txResponse.wait();
    console.log('Transaction completed:', txResponse);
  } catch (error) {
    console.error('Error executing swap:', error);
  }
}
