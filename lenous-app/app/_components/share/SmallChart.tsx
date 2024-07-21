import React from 'react';

type DataPoint = {
  priceUsd: string;
  time: number;
  date: string;
};

type LineChartProps = {
  data: DataPoint[];
};

const SmallChart: React.FC<LineChartProps> = ({ data }) => {
  const chartWidth = 1200;
  const chartHeight = 600;
  const offsetY = 40;
  const paddingX = 50;
  const paddingY = 90;

  // Parse the priceUsd to number
  const parsedData = data.map((item) => ({
    ...item,
    priceUsd: parseFloat(item.priceUsd),
  }));

  // Determine min and max price for better scaling
  const maxY = Math.max(...parsedData.map((item) => item.priceUsd));
  const minY = Math.min(...parsedData.map((item) => item.priceUsd));

  // Adding some padding to the maxY and minY
  const yPadding = (maxY - minY) * 0.1;
  const adjustedMaxY = maxY + yPadding;
  const adjustedMinY = minY - yPadding;

  const dateRange = [
    new Date(parsedData[0].date).getTime(),
    new Date(parsedData[parsedData.length - 1].date).getTime(),
  ];

  const properties = parsedData.map((property) => {
    const { priceUsd, date } = property;
    const dateTime = new Date(date).getTime();
    const x =
      ((dateTime - dateRange[0]) / (dateRange[1] - dateRange[0])) *
        (chartWidth - paddingX) +
      paddingX / 2;
    const y =
      chartHeight -
      offsetY -
      ((priceUsd - adjustedMinY) / (adjustedMaxY - adjustedMinY)) *
        (chartHeight - (paddingY + offsetY)) -
      paddingY +
      offsetY;
    return {
      priceUsd: priceUsd,
      date: date,
      x: x,
      y: y,
    };
  });

  const points = properties.map((point) => `${point.x},${point.y}`).join(' ');
  const polygonPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="presentation">
      {/* Define the gradient */}
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 204, 171, 0.75)" />
          <stop offset="50%" stopColor="rgba(0, 204, 171, 0.25)" />
          <stop offset="100%" stopColor="rgba(0, 205, 168, 0)" />
        </linearGradient>
      </defs>
      {/* Apply the gradient to the polygon */}
      <polygon fill="url(#grad)" points={polygonPoints} />
      {/* Optionally, add a stroke */}
      <polyline fill="none" stroke="#66a488" strokeWidth="1" points={points} />
    </svg>
  );
};

export default SmallChart;
