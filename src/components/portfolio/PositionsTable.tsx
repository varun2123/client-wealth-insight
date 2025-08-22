import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Position } from "@/types/portfolio";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable = ({ positions }: PositionsTableProps) => {
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

  const getAssetClassColor = (assetClass: string) => {
    switch (assetClass) {
      case 'Equity': return 'bg-blue-500/20 text-blue-300';
      case 'Bond': return 'bg-green-500/20 text-green-300';
      case 'Commodity': return 'bg-yellow-500/20 text-yellow-300';
      case 'FX': return 'bg-purple-500/20 text-purple-300';
      case 'Derivative': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Portfolio Positions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/50">
                <TableHead className="text-muted-foreground">Symbol</TableHead>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Asset Class</TableHead>
                <TableHead className="text-right text-muted-foreground">Quantity</TableHead>
                <TableHead className="text-right text-muted-foreground">Avg Price</TableHead>
                <TableHead className="text-right text-muted-foreground">Current Price</TableHead>
                <TableHead className="text-right text-muted-foreground">Market Value</TableHead>
                <TableHead className="text-right text-muted-foreground">P&L</TableHead>
                <TableHead className="text-right text-muted-foreground">Return %</TableHead>
                <TableHead className="text-right text-muted-foreground">Holding Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => (
                <TableRow key={position.id} className="border-border hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {position.symbol}
                  </TableCell>
                  <TableCell className="text-foreground max-w-[200px] truncate">
                    {position.name}
                  </TableCell>
                  <TableCell>
                    <Badge className={getAssetClassColor(position.assetClass)}>
                      {position.assetClass}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {position.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {formatCurrency(position.averagePrice)}
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {formatCurrency(position.currentPrice)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(position.marketValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      position.unrealizedPnL >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {position.unrealizedPnL >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {formatCurrency(position.unrealizedPnL)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={
                      position.totalReturnPercent >= 0 ? 'text-success' : 'text-destructive'
                    }>
                      {formatPercent(position.totalReturnPercent)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {position.holdingPeriod} days
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};