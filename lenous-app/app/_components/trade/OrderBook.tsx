import React, { useEffect, useState } from 'react';
import { ethers, providers, BigNumber } from 'ethers';
import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';
import { useEthersProvider, useEthersSigner } from '@/app/_libs/utils/ethers';
interface OrderPlacedEventArgs {
  orderId: BigNumber;
  trader: string;
  orderType: number; // Assuming OrderType is an enum with numeric values
  price: BigNumber;
  amount: BigNumber;
  stoploss: BigNumber;
  takeprofit: BigNumber;
  expiration: BigNumber;
  asset: string;
}
interface Order {
  orderId: string;
  trader: string;
  orderType: string;
  price: string;
  amount: string;
  stoploss: string;
  takeprofit: string;
  expiration: string;
  asset: string;
}

interface OrderbookProps {
  provider: providers.Provider;
  userAddress: string;
}

const Orderbook: React.FC<OrderbookProps> = ({ userAddress }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  if (!provider) {
    return <></>;
  }
  // Address of your smart contract
  const contractAddress = '0x33A5D5d8D89249e7d362AF7D46Df76F5C335F2e7'; // Replace with your smart contract address

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const contract = new ethers.Contract(
          contractAddress,
          OrderbookABI,
          provider
        );
        const fromBlock = 0;
        const toBlock = await provider.getBlockNumber();

        console.log('Fetching from block', fromBlock, 'to block', toBlock);

        const chunkSize = 1000;
        const fetchedOrders: Order[] = [];

        for (
          let startBlock = fromBlock;
          startBlock <= toBlock;
          startBlock += chunkSize
        ) {
          const endBlock = Math.min(startBlock + chunkSize - 1, toBlock);

          console.log(
            'Fetching events from block',
            startBlock,
            'to block',
            endBlock
          );

          // Query for OrderPlaced events
          const events = await contract.queryFilter(
            contract.filters.OrderPlaced(
              null,
              userAddress,
              null,
              null,
              null,
              null,
              null,
              null,
              null
            ),
            startBlock,
            endBlock
          );

          console.log('Fetched events', events);

          fetchedOrders.push(
            ...events.map((event) => {
              const args = event.args as unknown as OrderPlacedEventArgs;
              return {
                orderId: args.orderId.toString(),
                trader: args.trader,
                orderType: args.orderType.toString(),
                price: ethers.utils.formatUnits(args.price, 6),
                amount: ethers.utils.formatUnits(args.amount, 6),
                stoploss: ethers.utils.formatUnits(args.stoploss, 6),
                takeprofit: ethers.utils.formatUnits(args.takeprofit, 6),
                expiration: new Date(
                  args.expiration.toNumber() * 1000
                ).toLocaleString(),
                asset: args.asset,
              };
            })
          );
        }

        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error fetching orders', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [provider, userAddress]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Trader</th>
            <th>Order Type</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Stoploss</th>
            <th>Takeprofit</th>
            <th>Expiration</th>
            <th>Asset</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.trader}</td>
              <td>{order.orderType}</td>
              <td>{order.price}</td>
              <td>{order.amount}</td>
              <td>{order.stoploss}</td>
              <td>{order.takeprofit}</td>
              <td>{order.expiration}</td>
              <td>{order.asset}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orderbook;
