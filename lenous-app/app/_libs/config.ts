'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = '4aac15bd46041b8e047641da7bae91e1';

const supportedChains: Chain[] = [mainnet, sepolia];

export const config = getDefaultConfig({
  appName: 'lenous',
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
