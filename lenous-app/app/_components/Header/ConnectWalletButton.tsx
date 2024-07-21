'use client';

import { useEffect, useRef } from 'react';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { abbreviateAddress } from '@/app/_libs/utils/abbreviateAddress ';

export const ConnectWalletButton = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        className="btn text-white border py-2 rounded-2xl px-4 border-neutral-light"
        onClick={async () => {
          // Disconnecting wallet first because sometimes when is connected but the user is not connected
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect wallet'}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className="max-w-5xl w-full flex gap-2 items-center justify-between">
      <div
        className="flex text-white border-neutral-light  justify-center items-center px-4 py-2 border bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        <p>{abbreviateAddress(address)}</p>
      </div>
      <button
        className="btn text-white border p-2 rounded-2xl border-neutral-light"
        onClick={openChainModal}
      >
        Switch Networks
      </button>
    </div>
  );
};
