import { useState } from "react";
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
  generateMockPortfolioSummary
} from "@/utils/mockData";
import { Position, Trade, CashBalance } from "@/types/portfolio";
import { toast } from "sonner";
import { applyTradeToPortfolio } from "@/utils/mockData";
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

  // const handleTradeAdd = (newTrade: Omit<Trade, 'id'>) => {
  //   const trade: Trade = {
  //     ...newTrade,
  //     id: `trade-${Date.now()}`,
  //   };
  //   setTrades([trade, ...trades]);
  // };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onFileUpload={() => setShowExcelUpload(true)}
        clientName="Global Wealth Management"
        // onDownload={() => exportDashboardPDF()}
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
