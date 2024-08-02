// context/TokenContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TokenContextProps {
  tokenSymbol: string;
  setTokenSymbol: (symbol: string) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export function useTokenContext() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokenSymbol, setTokenSymbol] = useState<string>('BTCUSDT'); // Default token symbol

  return (
    <TokenContext.Provider value={{ tokenSymbol, setTokenSymbol }}>
      {children}
    </TokenContext.Provider>
  );
}
