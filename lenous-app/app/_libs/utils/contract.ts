import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from '@/app/_libs/utils/ethers';
import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';
import LiquidityPoolABI from '@/app/_libs/utils/abis/LiquidityPool.json';
import MyTokenABI from '@/app/_libs/utils/abis/MyToken.json';

const ORDERBOOK_ADDRESS = '0xEdED8087cc8d2c311543f869Df7e7df1973Adfad';
const LIQUIDITYPOOL_ADDRESS = '0xF407c9C204703E690855cd8dBe61EfF1df0Fa300';
const MYTOKEN_ADDRESS = '0x124b6493dfEc414B755DD4405Bf295A878A0d77c';

// Custom hooks to get contract instances
export const useOrderbookContract = () => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  return new ethers.Contract(
    ORDERBOOK_ADDRESS,
    OrderbookABI,
    signer || provider
  );
};

export const useLiquidityPoolContract = () => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  return new ethers.Contract(
    LIQUIDITYPOOL_ADDRESS,
    LiquidityPoolABI,
    signer || provider
  );
};

export const useMyTokenContract = () => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  return new ethers.Contract(MYTOKEN_ADDRESS, MyTokenABI, signer || provider);
};

// Function to deposit margin
export const depositMargin = async (amount: number, marginType: number) => {
  try {
    // Get contract instance
    const contract = useOrderbookContract();

    // Parse the amount to the appropriate units
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6); // Assuming USDC has 6 decimals

    // Log the parsed amount and margin type for debugging
    console.log(`Parsed Amount: ${parsedAmount.toString()}`);
    console.log(`Margin Type: ${marginType}`);

    // Send the transaction
    const tx = await contract.depositMargin(parsedAmount, marginType);

    // Log the transaction hash
    console.log(`Transaction Hash: ${tx.hash}`);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Log the transaction receipt for debugging
    console.log('Transaction Receipt:', receipt);

    // Check for errors in the transaction receipt
    if (receipt.status === 1) {
      console.log('Transaction Successful');
    } else {
      console.error('Transaction Failed');
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Error in depositMargin:', error);
  }
};

// Function to place market order
export const placeMarketOrder = async (
  amount: number,
  isBuyOrder: boolean,
  leverage: number,
  marginType: number
) => {
  const contract = useOrderbookContract();
  const tx = await contract.placeMarketOrder(
    ethers.utils.parseUnits(amount.toString(), 6),
    isBuyOrder,
    leverage,
    marginType
  );
  await tx.wait();
};

// Function to place limit order
export const placeLimitOrder = async (
  price: number,
  stopLossPrice: number,
  takeProfitPrice: number,
  amount: number,
  isBuyOrder: boolean,
  expiration: number,
  leverage: number,
  marginType: number
) => {
  const contract = useOrderbookContract();
  const tx = await contract.placeLimitOrder(
    ethers.utils.parseUnits(price.toString(), 6),
    ethers.utils.parseUnits(stopLossPrice.toString(), 6),
    ethers.utils.parseUnits(takeProfitPrice.toString(), 6),
    ethers.utils.parseUnits(amount.toString(), 6),
    isBuyOrder,
    expiration,
    leverage,
    marginType
  );
  await tx.wait();
};
