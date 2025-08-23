import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { PortfolioSummaryCard } from "@/components/portfolio/PortfolioSummaryCard";
import { PositionsTable } from "@/components/portfolio/PositionsTable";
import { RiskMetricsCard } from "@/components/portfolio/RiskMetricsCard";
import { CashBalanceCard } from "@/components/portfolio/CashBalanceCard";
import { BenchmarkChart } from "@/components/benchmarking/BenchmarkChart";
import { ExcelUpload } from "@/components/data/ExcelUpload";
import { 
  mockPositions, 
  mockCashBalances, 
  mockRiskMetrics, 
  mockBenchmarkComparisons,
  generateMockPortfolioSummary
} from "@/utils/mockData";
import { Position, CashBalance } from "@/types/portfolio";

const exportPDF = () => {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [cashBalances, setCashBalances] = useState<CashBalance[]>(mockCashBalances);
  const [showExcelUpload, setShowExcelUpload] = useState(false);

  const portfolioSummary = generateMockPortfolioSummary(positions, cashBalances);

  useEffect(() => {
    // trigger print automatically after page load
    setTimeout(() => {
      window.print();
    }, 500); // small delay to ensure charts/rendered elements appear
  }, []);

  const handleDataLoaded = (data: {
    positions: Position[];
    cashBalances: CashBalance[];
  }) => {
    setPositions(data.positions);
    setCashBalances(data.cashBalances);
    setShowExcelUpload(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onFileUpload={() => setShowExcelUpload(true)}
        clientName="Global Wealth Management"
        // onDownload={() => {}} // disable download in this page
      />
      
      <main id="dashboard-container" className="container mx-auto px-6 py-8 space-y-12">
        
        {/* Portfolio Summary */}
        <PortfolioSummaryCard portfolio={portfolioSummary} />

        {/* Positions */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Positions</h2>
          <PositionsTable positions={positions} />
        </section>

        {/* Risk & Analytics */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Risk & Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskMetricsCard metrics={mockRiskMetrics} />
            <CashBalanceCard balances={cashBalances} />
          </div>
        </section>

        {/* Benchmarks */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Benchmarks</h2>
          <BenchmarkChart comparisons={mockBenchmarkComparisons} />
        </section>

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

export default exportPDF;
