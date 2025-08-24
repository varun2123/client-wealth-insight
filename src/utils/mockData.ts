import { Position, Trade, CashBalance, PortfolioSummary, RiskMetrics, BenchmarkComparison, exchangeRates  } from "@/types/portfolio";
const EurTousd = exchangeRates.EurTousd;
const GbpTousd = exchangeRates.GbpTousd;

export const mockPositions: Position[] = [
  // --- Equity ---
  {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    assetClass: "Equity",
    quantity: 50,
    buyPrice: 145,
    currentPrice: 150,
    marketValue: 7500,
    bookValue: 7250,
    unrealizedPnL: 250,
    realizedPnL: 0,
    totalReturn: 250,
    totalReturnPercent: 3.45,
    currency: "USD",
    sector: "Technology",
    purchaseDate: "2024-01-15",
    holdingPeriod: 220,
    beta: 1.2,
  },
  {
    id: "2",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    assetClass: "Equity",
    quantity: 30,
    buyPrice: 300,
    currentPrice: 320,
    marketValue: 9600,
    bookValue: 9000,
    unrealizedPnL: 600,
    realizedPnL: 0,
    totalReturn: 600,
    totalReturnPercent: 6.67,
    currency: "USD",
    sector: "Technology",
    purchaseDate: "2024-02-10",
    holdingPeriod: 190,
    beta: 0.95,
  },
  {
    id: "3",
    name: "Johnson & Johnson",
    symbol: "JNJ",
    assetClass: "Equity",
    quantity: 40,
    buyPrice: 160,
    currentPrice: 158,
    marketValue: 6320,
    bookValue: 6400,
    unrealizedPnL: -80,
    realizedPnL: 0,
    totalReturn: -80,
    totalReturnPercent: -1.25,
    currency: "USD",
    sector: "Healthcare",
    purchaseDate: "2024-03-05",
    holdingPeriod: 165,
    beta: 0.7,
  },

  // --- Bond ---
  {
    id: "4",
    name: "US Treasury Bond 10Y",
    symbol: "UST10Y",
    assetClass: "Bond",
    quantity: 10000,
    buyPrice: 98.5,
    currentPrice: 99.2,
    marketValue: 9920,
    bookValue: 9850,
    unrealizedPnL: 70,
    realizedPnL: 0,
    totalReturn: 70,
    totalReturnPercent: 0.71,
    currency: "USD",
    purchaseDate: "2023-06-01",
    holdingPeriod: 450,
    couponRate: 3.5,
    maturityDate: "2033-06-01",
    accruedInterest: 120.5,
  },
  {
    id: "5",
    name: "Corporate Bond - Apple Inc.",
    symbol: "AAPL-BOND",
    assetClass: "Bond",
    quantity: 5000,
    buyPrice: 102,
    currentPrice: 101,
    marketValue: 5050,
    bookValue: 5100,
    unrealizedPnL: -50,
    realizedPnL: 0,
    totalReturn: -50,
    totalReturnPercent: -0.98,
    currency: "USD",
    purchaseDate: "2024-01-10",
    holdingPeriod: 225,
    couponRate: 4.0,
    maturityDate: "2029-01-10",
    accruedInterest: 75,
  },
  {
    id: "6",
    name: "Municipal Bond - NY City",
    symbol: "NYMUNI",
    assetClass: "Bond",
    quantity: 3000,
    buyPrice: 101.5,
    currentPrice: 103,
    marketValue: 3090,
    bookValue: 3045,
    unrealizedPnL: 45,
    realizedPnL: 0,
    totalReturn: 45,
    totalReturnPercent: 1.48,
    currency: "USD",
    purchaseDate: "2023-12-01",
    holdingPeriod: 270,
    couponRate: 2.75,
    maturityDate: "2032-12-01",
    accruedInterest: 60,
  },

  // --- Commodity ---
  {
    id: "7",
    name: "Gold Futures",
    symbol: "XAUUSD",
    assetClass: "Commodity",
    quantity: 2,
    buyPrice: 1950,
    currentPrice: 2000,
    marketValue: 4000,
    bookValue: 3900,
    unrealizedPnL: 100,
    realizedPnL: 0,
    totalReturn: 100,
    totalReturnPercent: 2.56,
    currency: "USD",
    purchaseDate: "2024-03-10",
    holdingPeriod: 150,
    expiryDate: "2024-10-25"
  },
  {
    id: "8",
    name: "Crude Oil Futures",
    symbol: "CL",
    assetClass: "Commodity",
    quantity: 1,
    buyPrice: 75,
    currentPrice: 78,
    marketValue: 7800,
    bookValue: 7500,
    unrealizedPnL: 300,
    realizedPnL: 0,
    totalReturn: 300,
    totalReturnPercent: 4.00,
    currency: "USD",
    purchaseDate: "2024-04-20",
    holdingPeriod: 130,
    expiryDate: "2024-11-20"
  },
  {
    id: "9",
    name: "Silver Futures",
    symbol: "XAGUSD",
    assetClass: "Commodity",
    quantity: 3,
    buyPrice: 24,
    currentPrice: 23.5,
    marketValue: 70.5,
    bookValue: 72,
    unrealizedPnL: -1.5,
    realizedPnL: 0,
    totalReturn: -1.5,
    totalReturnPercent: -2.08,
    currency: "USD",
    purchaseDate: "2024-05-10",
    holdingPeriod: 100,
    expiryDate: "2024-12-20"
  },

  // --- FX ---
  {
    id: "10",
    name: "EUR/USD",
    symbol: "EURUSD",
    assetClass: "FX",
    quantity: 10000,
    buyPrice: 1.08,
    currentPrice: 1.10,
    marketValue: 11000,
    bookValue: 10800,
    unrealizedPnL: 200,
    realizedPnL: 0,
    totalReturn: 200,
    totalReturnPercent: 1.85,
    currency: "USD",
    purchaseDate: "2024-04-05",
    holdingPeriod: 120,
    baseCurrency: "EUR",
    quoteCurrency: "USD",
  },
  {
    id: "11",
    name: "GBP/USD",
    symbol: "GBPUSD",
    assetClass: "FX",
    quantity: 8000,
    buyPrice: 1.25,
    currentPrice: 1.26,
    marketValue: 10080,
    bookValue: 10000,
    unrealizedPnL: 80,
    realizedPnL: 0,
    totalReturn: 80,
    totalReturnPercent: 0.8,
    currency: "USD",
    purchaseDate: "2024-05-15",
    holdingPeriod: 100,
    baseCurrency: "GBP",
    quoteCurrency: "USD",
  },
  {
    id: "12",
    name: "USD/JPY",
    symbol: "USDJPY",
    assetClass: "FX",
    quantity: 9000,
    buyPrice: 140,
    currentPrice: 138,
    marketValue: 12420,
    bookValue: 12600,
    unrealizedPnL: -180,
    realizedPnL: 0,
    totalReturn: -180,
    totalReturnPercent: -1.43,
    currency: "JPY",
    purchaseDate: "2024-06-01",
    holdingPeriod: 85,
    baseCurrency: "USD",
    quoteCurrency: "JPY",
  },

  // --- ETF ---
  {
    id: "13",
    name: "Vanguard Total Stock Market ETF",
    symbol: "VTI",
    assetClass: "ETF",
    quantity: 20,
    buyPrice: 210,
    currentPrice: 220,
    marketValue: 4400,
    bookValue: 4200,
    unrealizedPnL: 200,
    realizedPnL: 0,
    totalReturn: 200,
    totalReturnPercent: 4.76,
    currency: "USD",
    purchaseDate: "2024-05-01",
    holdingPeriod: 100,
  },
  {
    id: "14",
    name: "iShares MSCI Emerging Markets ETF",
    symbol: "EEM",
    assetClass: "ETF",
    quantity: 30,
    buyPrice: 40,
    currentPrice: 39.5,
    marketValue: 1185,
    bookValue: 1200,
    unrealizedPnL: -15,
    realizedPnL: 0,
    totalReturn: -15,
    totalReturnPercent: -1.25,
    currency: "USD",
    purchaseDate: "2024-05-15",
    holdingPeriod: 95,
  },
  {
    id: "15",
    name: "SPDR S&P 500 ETF Trust",
    symbol: "SPY",
    assetClass: "ETF",
    quantity: 10,
    buyPrice: 420,
    currentPrice: 430,
    marketValue: 4300,
    bookValue: 4200,
    unrealizedPnL: 100,
    realizedPnL: 0,
    totalReturn: 100,
    totalReturnPercent: 2.38,
    currency: "USD",
    purchaseDate: "2024-06-01",
    holdingPeriod: 85,
  },

  // --- Derivative (Option/Future) ---
  {
    id: "16",
    name: "AAPL Call Option (Sep 2025, Strike 150)",
    symbol: "AAPL220C150",
    assetClass: "Derivative",
    quantity: 5,
    buyPrice: 5.0,
    currentPrice: 6.5,
    marketValue: 3250,
    bookValue: 2500,
    unrealizedPnL: 750,
    realizedPnL: 0,
    totalReturn: 750,
    totalReturnPercent: 30.0,
    currency: "USD",
    purchaseDate: "2024-07-01",
    holdingPeriod: 60,
    delta: 0.65,
    contractSize: 100,
    expiryDate: "2025-09-20",
  },
  {
    id: "17",
    name: "S&P 500 E-mini Future",
    symbol: "ESU25",
    assetClass: "Derivative",
    quantity: 1,
    buyPrice: 4500,
    currentPrice: 4550,
    marketValue: 227500,
    bookValue: 225000,
    unrealizedPnL: 2500,
    realizedPnL: 0,
    totalReturn: 2500,
    totalReturnPercent: 1.11,
    currency: "USD",
    purchaseDate: "2024-06-15",
    holdingPeriod: 70,
    delta: 1,
    contractSize: 50,
    expiryDate: "2025-09-15",
  },
  {
    id: "18",
    name: "TSLA Put Option (Dec 2025, Strike 600)",
    symbol: "TSLA2512P600",
    assetClass: "Derivative",
    quantity: 2,
    buyPrice: 12,
    currentPrice: 10,
    marketValue: 2000,
    bookValue: 2400,
    unrealizedPnL: -400,
    realizedPnL: 0,
    totalReturn: -400,
    totalReturnPercent: -16.67,
    currency: "USD",
    purchaseDate: "2024-08-01",
    holdingPeriod: 45,
    delta: -0.4,
    contractSize: 100,
    expiryDate: "2025-12-20",
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

  // ---- Portfolio Beta (only equities have beta) ----
  const equityPositions = positions.filter(pos => typeof pos.beta === "number");
  const totalEquityValue = equityPositions.reduce((sum, pos) => sum + pos.marketValue, 0);

  const portfolioBeta = totalEquityValue > 0
    ? equityPositions.reduce((sum, pos) => sum + (pos.beta ?? 0) * pos.marketValue, 0) / totalEquityValue
    : 0;

  // ---- Portfolio Delta (only derivatives have delta) ----
  const derivativePositions = positions.filter(pos => typeof pos.delta === "number");
  const totalDerivativeValue = derivativePositions.reduce((sum, pos) => sum + pos.marketValue, 0);

  const portfolioDelta = totalDerivativeValue > 0
    ? derivativePositions.reduce((sum, pos) => sum + (pos.delta ?? 0) * pos.marketValue, 0) / totalDerivativeValue
    : 0;

  // ---- Portfolio Return (weighted by market value) ----
  const portfolioReturn = totalMarketValue > 0
    ? positions.reduce((sum, pos) => sum + (pos.totalReturnPercent ?? 0) * pos.marketValue, 0) / totalMarketValue
    : 0;

  // ---- Volatility (std dev of returns) ----
  const meanReturn = portfolioReturn;
  const variance = positions.length > 0
    ? positions.reduce((sum, pos) => sum + Math.pow((pos.totalReturnPercent ?? 0) - meanReturn, 2), 0) / positions.length
    : 0;
  const volatility = Math.sqrt(variance);

  // ---- Sharpe Ratio (assuming risk-free rate = 0) ----
  const sharpeRatio = volatility !== 0 ? portfolioReturn / volatility : 0;

  // ---- Value-at-Risk (95%) ----
  const var95 = -1.65 * volatility;

  // ---- Max Drawdown (worst return) ----
  const maxDrawdown = positions.length > 0
    ? Math.min(...positions.map(pos => pos.totalReturnPercent ?? 0))
    : 0;

  // ---- Correlation (average beta / portfolio beta) ----
  const avgBeta = equityPositions.length > 0
    ? equityPositions.reduce((sum, pos) => sum + (pos.beta ?? 0), 0) / equityPositions.length
    : 0;

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
