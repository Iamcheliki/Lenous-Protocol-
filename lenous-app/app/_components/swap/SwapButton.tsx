import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
export default function SwapButton({
  executeSwap,
}: {
  executeSwap: () => void;
}) {
  const { isConnecting, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();

  return (
    <div className="pt-12 text-right">
      {!isConnected ? (
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
      ) : (
        <button
          onClick={executeSwap}
          className="btn text-white border py-2 rounded-2xl px-4 border-neutral-light  w-52"
        >
          swap
        </button>
      )}
    </div>
  );
}
