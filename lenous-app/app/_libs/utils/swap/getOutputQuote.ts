import { QuoterV2 } from '../constants/swapConstants';
import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import fromReadableAmount from './fromReadableAmount';
import { SwapQuoter, Route } from '@uniswap/v3-sdk';
import { ethers } from 'ethers';
export async function getOutputQuote(
  swapRoute: Route<Token, Token>,
  tokenOneAmount: number,
  tokenA: Token,
  provider: ethers.providers.BaseProvider
) {
  const { calldata } = await SwapQuoter.quoteCallParameters(
    swapRoute,
    CurrencyAmount.fromRawAmount(
      tokenA,
      fromReadableAmount(tokenOneAmount, 18).toString()
    ),
    TradeType.EXACT_INPUT,
    {
      useQuoterV2: true,
    }
  );

  const quoteCallReturnData = await provider.call({
    to: QuoterV2,
    data: calldata,
  });

  return ethers.utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData);
}
