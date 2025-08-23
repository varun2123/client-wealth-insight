import { Position, Trade, CashBalance, PortfolioSummary, RiskMetrics, BenchmarkComparison, exchangeRates  } from "@/types/portfolio";
const EurTousd = exchangeRates.EurTousd;
const GbpTousd = exchangeRates.GbpTousd;

export const mockPositions: Position[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 100,
    buyPrice: 150.0,
    currentPrice: 175.5,
    marketValue: 17550,
    bookValue: 15000,
    unrealizedPnL: 2550,
    realizedPnL: 0,
    totalReturn: 2550,
    totalReturnPercent: 17.0,
    currency: "USD",
    sector: "Technology",
    assetClass: "Equity",
    purchaseDate: "2023-06-15",
    holdingPeriod: 220,
    beta: 1.25,
    delta: 0.65,
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 75,
    buyPrice: 280.0,
    currentPrice: 310.25,
    marketValue: 23268.75,
    bookValue: 21000,
    unrealizedPnL: 2268.75,
    realizedPnL: 500,
    totalReturn: 2768.75,
    totalReturnPercent: 13.18,
    currency: "USD",
    sector: "Technology",
    assetClass: "Equity",
    purchaseDate: "2023-05-10",
    holdingPeriod: 256,
    beta: 0.95,
    delta: 0.72,
  },
  {
    id: "3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 50,
    buyPrice: 120.0,
    currentPrice: 135.8,
    marketValue: 6790,
    bookValue: 6000,
    unrealizedPnL: 790,
    realizedPnL: 0,
    totalReturn: 790,
    totalReturnPercent: 13.17,
    currency: "USD",
    sector: "Technology",
    assetClass: "Equity",
    purchaseDate: "2023-08-22",
    holdingPeriod: 152,
    beta: 1.05,
    delta: 0.68,
  },
  {
    id: "4",
    symbol: "TSLA",
    name: "Tesla Inc.",
    quantity: 25,
    buyPrice: 200.0,
    currentPrice: 185.3,
    marketValue: 4632.5,
    bookValue: 5000,
    unrealizedPnL: -367.5,
    realizedPnL: 0,
    totalReturn: -367.5,
    totalReturnPercent: -7.35,
    currency: "USD",
    sector: "Consumer Discretionary",
    assetClass: "Equity",
    purchaseDate: "2023-09-15",
    holdingPeriod: 128,
    beta: 2.15,
    delta: 0.45,
  },
  {
    id: "5",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    quantity: 100,
    buyPrice: 420.0,
    currentPrice: 445.6,
    marketValue: 44560,
    bookValue: 42000,
    unrealizedPnL: 2560,
    realizedPnL: 0,
    totalReturn: 2560,
    totalReturnPercent: 6.1,
    currency: "USD",
    sector: "ETF",
    assetClass: "Equity",
    purchaseDate: "2023-04-01",
    holdingPeriod: 295,
    beta: 1.0,
    delta: 0.95,
  },
];

export const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "AAPL",
    type: "BUY",
    quantity: 100,
    price: 150.00,
    amount: 15000,
    currency: "USD",
    tradeDate: "2023-06-15",
    settlementDate: "2023-06-17",
    commission: 4.95,
    status: "Executed",
  },
  {
    id: "2",
    symbol: "MSFT",
    type: "BUY",
    quantity: 75,
    price: 280.00,
    amount: 21000,
    currency: "USD",
    tradeDate: "2023-05-10",
    settlementDate: "2023-05-12",
    commission: 4.95,
    status: "Executed",
  },
  {
    id: "3",
    symbol: "MSFT",
    type: "SELL",
    quantity: 25,
    price: 300.00,
    amount: 7500,
    currency: "USD",
    tradeDate: "2023-11-15",
    settlementDate: "2023-11-17",
    commission: 4.95,
    status: "Executed",
  },
];

export const mockCashBalances: CashBalance[] = [
  {
    currency: "USD",
    balance: 125000.00,
    availableBalance: 120000.00,
    reservedBalance: 5000.00,
  },
  {
    currency: "EUR",
    balance: parseFloat((125000.00 * EurTousd).toFixed(2)),
    availableBalance: parseFloat((120000.00 * EurTousd).toFixed(2)),
    reservedBalance: parseFloat((5000.00 * EurTousd).toFixed(2)),
  },
  {
    currency: "GBP",
    balance: parseFloat((125000.00 * GbpTousd).toFixed(2)),
    availableBalance: parseFloat((120000.00 * GbpTousd).toFixed(2)),
    reservedBalance: parseFloat((5000.00 * GbpTousd).toFixed(2)),
  },
];

function calculateRiskMetrics(positions: Position[]): RiskMetrics {
  const totalMarketValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0);

  // Portfolio Beta
  const portfolioBeta = positions.reduce((sum, pos) => sum + pos.beta * pos.marketValue, 0) / totalMarketValue;

  // Portfolio Delta
  const portfolioDelta = positions.reduce((sum, pos) => sum + pos.delta * pos.marketValue, 0) / totalMarketValue;

  // Portfolio Return (use totalReturnPercent weighted by market value)
  const portfolioReturn = positions.reduce((sum, pos) => sum + pos.totalReturnPercent * pos.marketValue, 0) / totalMarketValue;

  // Volatility (std dev of totalReturnPercent)
  const meanReturn = portfolioReturn;
  const variance = positions.reduce((sum, pos) => sum + Math.pow(pos.totalReturnPercent - meanReturn, 2), 0) / positions.length;
  const volatility = Math.sqrt(variance);

  // Sharpe Ratio (assume risk-free rate = 0)
  const sharpeRatio = volatility !== 0 ? portfolioReturn / volatility : 0;

  // VaR 95%
  const var95 = -1.65 * volatility;

  // Max Drawdown (min of totalReturnPercent)
  const maxDrawdown = Math.min(...positions.map(pos => pos.totalReturnPercent));

  // Correlation (average beta / portfolio beta)
  const avgBeta = positions.reduce((sum, pos) => sum + pos.beta, 0) / positions.length;
  const correlation = portfolioBeta !== 0 ? avgBeta / portfolioBeta : 0;

  return {
    portfolioBeta: Number(portfolioBeta.toFixed(2)),
    portfolioDelta: Number(portfolioDelta.toFixed(2)),
    sharpeRatio: Number(sharpeRatio.toFixed(2)),
    volatility: Number(volatility.toFixed(2)),
    var95: Number(var95.toFixed(2)),
    maxDrawdown: Number(maxDrawdown.toFixed(2)),
    correlation: Number(correlation.toFixed(2)),
  };
}

export const mockRiskMetrics: RiskMetrics = calculateRiskMetrics(mockPositions);

export const mockBenchmarkComparisons: BenchmarkComparison[] = [
  // ===== 1 Month =====
  {
    benchmark: "FTSE",
    portfolioReturn: 2.1,
    benchmarkReturn: 1.7,
    alpha: 0.4,
    beta: 1.08,
    correlation: 0.82,
    trackingError: 1.2,
    informationRatio: 0.33,
    period: "1M",
  },
  {
    benchmark: "NASDAQ",
    portfolioReturn: 2.6,
    benchmarkReturn: 2.3,
    alpha: 0.3,
    beta: 1.02,
    correlation: 0.88,
    trackingError: 1.1,
    informationRatio: 0.27,
    period: "1M",
  },

  // ===== 3 Months =====
  {
    benchmark: "FTSE",
    portfolioReturn: 5.4,
    benchmarkReturn: 4.7,
    alpha: 0.7,
    beta: 1.10,
    correlation: 0.84,
    trackingError: 2.5,
    informationRatio: 0.28,
    period: "3M",
  },
  {
    benchmark: "NASDAQ",
    portfolioReturn: 6.2,
    benchmarkReturn: 5.9,
    alpha: 0.3,
    beta: 1.04,
    correlation: 0.90,
    trackingError: 2.1,
    informationRatio: 0.14,
    period: "3M",
  },

  // ===== 6 Months =====
  {
    benchmark: "FTSE",
    portfolioReturn: 8.9,
    benchmarkReturn: 7.5,
    alpha: 1.4,
    beta: 1.11,
    correlation: 0.86,
    trackingError: 3.2,
    informationRatio: 0.44,
    period: "6M",
  },
  {
    benchmark: "NASDAQ",
    portfolioReturn: 10.3,
    benchmarkReturn: 9.6,
    alpha: 0.7,
    beta: 1.06,
    correlation: 0.91,
    trackingError: 2.9,
    informationRatio: 0.24,
    period: "6M",
  },

  // ===== 1 Year =====
  {
    benchmark: "FTSE",
    portfolioReturn: 12.5,
    benchmarkReturn: 10.2,
    alpha: 2.3,
    beta: 1.12,
    correlation: 0.85,
    trackingError: 4.2,
    informationRatio: 0.55,
    period: "1Y",
  },
  {
    benchmark: "NASDAQ",
    portfolioReturn: 15.8,
    benchmarkReturn: 14.1,
    alpha: 1.7,
    beta: 1.05,
    correlation: 0.92,
    trackingError: 3.8,
    informationRatio: 0.45,
    period: "1Y",
  },

  // ===== 3 Years =====
  {
    benchmark: "FTSE",
    portfolioReturn: 38.7,
    benchmarkReturn: 32.4,
    alpha: 6.3,
    beta: 1.09,
    correlation: 0.83,
    trackingError: 5.6,
    informationRatio: 1.13,
    period: "3Y",
  },
  {
    benchmark: "NASDAQ",
    portfolioReturn: 46.2,
    benchmarkReturn: 42.1,
    alpha: 4.1,
    beta: 1.07,
    correlation: 0.89,
    trackingError: 5.1,
    informationRatio: 0.80,
    period: "3Y",
  },
];

export const generateMockPortfolioSummary = (positions: Position[], cashBalances: CashBalance[]): PortfolioSummary => {
  const totalValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0) + 
                    cashBalances.reduce((sum, cash) => sum + cash.balance, 0);
  const totalCost = positions.reduce((sum, pos) => sum + pos.bookValue, 0);
  const totalPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnL + pos.realizedPnL, 0);
  const totalPnLPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

  return {
    totalValue,
    totalCost,
    totalPnL,
    totalPnLPercent,
    dayChange: 1250.00, // Mock day change
    dayChangePercent: 1.2, // Mock day change percentage
    cashBalances,
    positions,
    recentTrades: mockTrades.slice(0, 5),
  };
};

export const applyTradeToPortfolio = (
  positions: Position[],
  cashBalances: CashBalance[],
  trade: Trade
): { positions: Position[]; cashBalances: CashBalance[] } => {
  let updatedPositions = [...positions];
  let updatedCashBalances = [...cashBalances];

  const cash = updatedCashBalances.find(c => c.currency === trade.currency);
  if (!cash) {
    updatedCashBalances.push({
      currency: trade.currency,
      balance: 0,
      availableBalance: 0,
      reservedBalance: 0,
    });
  }

  if (trade.type === "BUY") {
    // Update cash
    updatedCashBalances = updatedCashBalances.map(c =>
      c.currency === trade.currency
        ? { ...c, balance: c.balance - trade.amount }
        : c
    );

    // Update or add position
    const posIndex = updatedPositions.findIndex(p => p.symbol === trade.symbol);
    if (posIndex >= 0) {
      const pos = updatedPositions[posIndex];
      const newQuantity = pos.quantity + trade.quantity;
      const newBookValue = pos.bookValue + trade.amount;
      updatedPositions[posIndex] = {
        ...pos,
        quantity: newQuantity,
        bookValue: newBookValue,
        buyPrice: newBookValue / newQuantity,
      };
    } else {
      updatedPositions.push({
        id: `pos-${Date.now()}`,
        symbol: trade.symbol,
        name: trade.symbol,
        quantity: trade.quantity,
        buyPrice: trade.price,
        currentPrice: trade.price,
        marketValue: trade.amount,
        bookValue: trade.amount,
        unrealizedPnL: 0,
        realizedPnL: 0,
        totalReturn: 0,
        totalReturnPercent: 0,
        currency: trade.currency,
        sector: "Unknown",
        assetClass: "Equity",
        purchaseDate: trade.tradeDate,
        holdingPeriod: 0,
        beta: 1,
        delta: 0,
      });
    }
  } else if (trade.type === "SELL") {
    // Update cash
    updatedCashBalances = updatedCashBalances.map(c =>
      c.currency === trade.currency
        ? { ...c, balance: c.balance + trade.amount }
        : c
    );

    // Update position
    const posIndex = updatedPositions.findIndex(p => p.symbol === trade.symbol);
    if (posIndex >= 0) {
      const pos = updatedPositions[posIndex];
      const newQuantity = pos.quantity - trade.quantity;
      const realizedPnL = (trade.price - pos.buyPrice) * trade.quantity;

      if (newQuantity > 0) {
        updatedPositions[posIndex] = {
          ...pos,
          quantity: newQuantity,
          marketValue: newQuantity * pos.currentPrice,
          realizedPnL: pos.realizedPnL + realizedPnL,
        };
      } else {
        // If fully sold, remove position
        updatedPositions.splice(posIndex, 1);
      }
    }
  }

  return { positions: updatedPositions, cashBalances: updatedCashBalances };
};
