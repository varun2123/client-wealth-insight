import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { PortfolioSummary } from "@/types/portfolio";

interface PortfolioSummaryCardProps {
  portfolio: PortfolioSummary;
}

export const PortfolioSummaryCard = ({ portfolio }: PortfolioSummaryCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Portfolio Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
<div className="text-2xl font-bold text-foreground">
  {formatCurrency(
    portfolio.totalValue -
      portfolio.cashBalances.reduce((sum, cb) => sum + cb.balance, 0)
  )}
</div>


          {/* <p className="text-xs text-muted-foreground">
            Cost basis: {formatCurrency(portfolio.totalCost)}
          </p> */}
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total P&L
          </CardTitle>
          {portfolio.totalPnL >= 0 ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            portfolio.totalPnL >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatCurrency(portfolio.totalPnL)}
          </div>
          <p className={`text-xs ${
            portfolio.totalPnLPercent >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatPercent(portfolio.totalPnLPercent)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Day Change
          </CardTitle>
          {portfolio.dayChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            portfolio.dayChange >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatCurrency(portfolio.dayChange)}
          </div>
          <p className={`text-xs ${
            portfolio.dayChangePercent >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatPercent(portfolio.dayChangePercent)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Positions Count
          </CardTitle>
          <PieChart className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {portfolio.positions.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Active positions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};