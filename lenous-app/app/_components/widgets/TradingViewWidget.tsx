'use client';
import React, { useEffect, useRef, memo } from 'react';
import { useTokenContext } from '@/app/_context/TokenContext'; // Import your context

const TradingViewWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setTokenSymbol } = useTokenContext(); // Get the context function

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      container_id: 'technical-analysis-chart-demo',
      width: '100%',
      height: '100%',
      autosize: true,
      symbol: 'BTCUSDT', // Default symbol
      interval: 'D',
      timezone: 'exchange',
      theme: 'Dark',
      style: '1',
      withdateranges: true,
      allow_symbol_change: true,
      save_image: false,
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      symbol_search_request: { type: 'crypto' },
      symbol_search_results: { type: 'crypto' },
      symbol_search_preset: { type: 'crypto' },
      onSymbolChange: (symbol: string) => {
        console.log('Symbol changed:', symbol); // For debugging
        setTokenSymbol(symbol); // Update the context with the new symbol
      },
    });

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = ''; // Clean up the container when the component is unmounted
      }
    };
  }, [setTokenSymbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ height: '100%', width: '100%' }}
    >
      <div
        id="technical-analysis-chart-demo"
        className="tradingview-widget-container__widget"
        style={{ height: 'calc(100% - 230px)', width: '100%' }}
      ></div>
    </div>
  );
};

export default memo(TradingViewWidget);
