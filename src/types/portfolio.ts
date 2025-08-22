export interface Position {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  bookValue: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalReturn: number;
  totalReturnPercent: number;
  currency: string;
  sector: string;
  assetClass: 'Equity' | 'Bond' | 'Commodity' | 'FX' | 'Derivative';
  purchaseDate: string;
  holdingPeriod: number;
  beta?: number;
  delta?: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  amount: number;
  currency: string;
  tradeDate: string;
  settlementDate: string;
  commission: number;
  status: 'Executed' | 'Pending' | 'Cancelled';
}

export interface CashBalance {
  currency: string;
  balance: number;
  availableBalance: number;
  reservedBalance: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalances: CashBalance[];
  positions: Position[];
  recentTrades: Trade[];
}

export interface RiskMetrics {
  portfolioBeta: number;
  portfolioDelta: number;
  sharpeRatio: number;
  volatility: number;
  var95: number; // Value at Risk 95%
  maxDrawdown: number;
  correlation: number;
}

export interface BenchmarkComparison {
  benchmark: string;
  portfolioReturn: number;
  benchmarkReturn: number;
  alpha: number;
  beta: number;
  correlation: number;
  trackingError: number;
  informationRatio: number;
  period: '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';
}

export interface PriceData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}