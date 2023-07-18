export interface ComparisonData {
  id: number;
  spotPrice: number;
  strikePrice: number;
  maturity: number;
  riskFreeRate: number;
  volatility: number;
  callPriceNN: number;
  callPriceMonteCarlos: number;
}

export const generateComparisonData = (): ComparisonData[] => {
  const data: ComparisonData[] = [];

  const getRandomDecimal = (min: number, max: number): number => {
    const randomValue = Math.random() * (max - min) + min;
    return Number(randomValue.toFixed(2));
  };

  for (let i = 0; i < 1000; i++) {
    const rowData: ComparisonData = {
      id: i + 1,
      spotPrice: getRandomDecimal(100, 5000),
      strikePrice: getRandomDecimal(100, 5000),
      maturity: getRandomDecimal(1, 365),
      riskFreeRate: getRandomDecimal(0.01, 0.1),
      volatility: getRandomDecimal(0, 1),
      callPriceNN: getRandomDecimal(0, 1000),
      callPriceMonteCarlos: getRandomDecimal(0, 1000),
    };

    data.push(rowData);
  }

  return data;
};
