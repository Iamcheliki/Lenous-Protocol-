import { ethers } from 'ethers';

export default function fromReadableAmount(
  amount: number,
  decimals: number
): ethers.BigNumber {
  return ethers.utils.parseUnits(amount.toString(), decimals);
}
