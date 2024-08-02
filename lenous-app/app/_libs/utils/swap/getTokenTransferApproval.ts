import { Token } from '@uniswap/sdk-core';
import { ethers } from 'ethers';
import { ERC20_ABI } from '../constants/swapConstants';
import fromReadableAmount from './fromReadableAmount';

export enum TransactionState {
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}

export async function getTokenTransferApproval(
  token: Token,
  tokenAmount: number,
  provider: ethers.providers.BaseProvider,
  swapRouter: string,
  signer: ethers.Signer,
  address: string
): Promise<TransactionState> {
  try {
    const tokenContract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      provider
    );

    const transaction = await tokenContract.populateTransaction.approve(
      swapRouter,
      fromReadableAmount(tokenAmount, token.decimals).toString()
    );

    const txResponse = await signer.sendTransaction({
      ...transaction,
      from: address,
    });

    await txResponse.wait(); // Wait for the transaction to be mined
    console.log('Approval transaction completed:', txResponse);
    return TransactionState.Success;
  } catch (e) {
    console.error(e);
    return TransactionState.Failed;
  }
}
