'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import {
  arbitrum,
  mainnet,
  sepolia,
  polygon,
  arbitrumGoerli,
} from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Token } from '@uniswap/sdk-core';

const projectId = '4aac15bd46041b8e047641da7bae91e1';

const supportedChains: Chain[] = [mainnet, polygon, sepolia];

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
