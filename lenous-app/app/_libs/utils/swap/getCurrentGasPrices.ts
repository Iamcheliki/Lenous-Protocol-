import { ethers } from 'ethers';
export const getCurrentGasPrices = async (
  provider: ethers.providers.BaseProvider
) => {
  const gasPrice = await provider.getGasPrice();
  console.log(
    'Current gas price:',
    ethers.utils.formatUnits(gasPrice, 'gwei'),
    'Gwei'
  );
  return gasPrice;
};
