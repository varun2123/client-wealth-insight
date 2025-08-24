import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { PortfolioSummaryCard } from "@/components/portfolio/PortfolioSummaryCard";
import { PositionsTable } from "@/components/portfolio/PositionsTable";
import { RiskMetricsCard } from "@/components/portfolio/RiskMetricsCard";
import { CashBalanceCard } from "@/components/portfolio/CashBalanceCard";
import { TradeEntryForm } from "@/components/trading/TradeEntryForm";
import { BenchmarkChart } from "@/components/benchmarking/BenchmarkChart";
import { DataIntegrationDiagram } from "@/components/integration/DataIntegrationDiagram";
import { ExcelUpload } from "@/components/data/ExcelUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  mockPositions, 
  mockCashBalances, 
  mockRiskMetrics, 
  mockBenchmarkComparisons,
  mockTrades,
  generateMockPortfolioSummary,
  applyTradeToPortfolio
} from "@/utils/mockData";
import { Position, Trade, CashBalance } from "@/types/portfolio";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1"];

const Index = () => {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [trades, setTrades] = useState<Trade[]>(mockTrades);
  const [cashBalances, setCashBalances] = useState<CashBalance[]>(mockCashBalances);
  const [showExcelUpload, setShowExcelUpload] = useState(false);

  const portfolioSummary = generateMockPortfolioSummary(positions, cashBalances);

  const handleDataLoaded = (data: {
    positions: Position[];
    trades: Trade[];
    cashBalances: CashBalance[];
  }) => {
    setPositions(data.positions);
    setTrades([...trades, ...data.trades]);
    setCashBalances(data.cashBalances);
    setShowExcelUpload(false);
  };

  const handleTradeAdd = (newTrade: Omit<Trade, "id">) => {
    const trade: Trade = {
      ...newTrade,
      id: `trade-${Date.now()}`,
    };

    const { positions: newPositions, cashBalances: newCash } = applyTradeToPortfolio(
      positions,
      cashBalances,
      trade
    );

    setTrades([trade, ...trades]);
    setPositions(newPositions);
    setCashBalances(newCash);
  };

  // Aggregate portfolio allocation by asset class
  const allocationData = useMemo(() => {
    const grouped: Record<string, number> = {};
    positions.forEach((pos) => {
      grouped[pos.assetClass] = (grouped[pos.assetClass] || 0) + pos.marketValue;
    });
    return Object.entries(grouped).map(([assetClass, value]) => ({
      name: assetClass,
      value,
    }));
  }, [positions]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onFileUpload={() => setShowExcelUpload(true)}
        clientName="Global Wealth Management"
      />
      
      <main id="dashboard-container" className="container mx-auto px-6 py-8 space-y-8">
        <PortfolioSummaryCard portfolio={portfolioSummary} />
        
        <Tabs defaultValue="positions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/30">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="analytics">Risk & Analytics</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
            {/* <TabsTrigger value="integration">Integration</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="positions" className="space-y-6">
            <PositionsTable positions={positions} />

            {/* Allocation Pie Chart below table */}
            <div className="p-6 bg-card rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4">Portfolio Allocation by Asset Class</h3>
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <PieChart>
<Pie
  data={allocationData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={120}
  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
>
  {allocationData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
<Tooltip
  formatter={(value: number, name: string, props) => {
    const total = allocationData.reduce((acc, entry) => acc + entry.value, 0);
    const percent = (value / total) * 100;
    return [`${percent.toFixed(2)}%`, name];
  }}
/>

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskMetricsCard metrics={mockRiskMetrics} />
              <CashBalanceCard balances={cashBalances} />
            </div>
          </TabsContent>
          
          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TradeEntryForm onTradeAdd={handleTradeAdd} />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Trades</h3>
                <div className="space-y-2">
                  {trades.slice(0, 5).map((trade) => (
                    <div key={trade.id} className="p-4 bg-gradient-card border border-border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold">{trade.symbol}</span>
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${
                            trade.type === 'BUY' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                          }`}>
                            {trade.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${trade.amount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{trade.tradeDate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benchmarks" className="space-y-6">
            <BenchmarkChart comparisons={mockBenchmarkComparisons} />
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-6">
            <DataIntegrationDiagram />
          </TabsContent>
        </Tabs>
      </main>

      {showExcelUpload && (
        <ExcelUpload
          onDataLoaded={handleDataLoaded}
          onClose={() => setShowExcelUpload(false)}
        />
      )}
    </div>
  );
};

export default Index;
