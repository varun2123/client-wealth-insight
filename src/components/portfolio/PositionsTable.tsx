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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Position } from "@/types/portfolio";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable = ({ positions }: PositionsTableProps) => {
  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`;
  };

  const getAssetClassColor = (assetClass: string) => {
    switch (assetClass) {
      case "Equity":
        return "bg-blue-500/20 text-blue-300";
      case "Bond":
        return "bg-green-500/20 text-green-300";
      case "Commodity":
        return "bg-yellow-500/20 text-yellow-300";
      case "FX":
        return "bg-purple-500/20 text-purple-300";
      case "Derivative":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getDailyMTM = (currentPrice: number): number => {
    const fluctuation =
      (Math.random() * 5 + 5) * (Math.random() > 0.5 ? 1 : -1);
    return currentPrice - fluctuation;
  };

  const renderTable = (filtered: Position[], type: string) => (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Buy Price</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Market Value</TableHead>
            <TableHead className="text-right">Daily MTM</TableHead>

            {/* asset-specific headers */}
            {type === "Bond" && (
              <>
                <TableHead className="text-right">Accrued Interest</TableHead>
                <TableHead className="text-right">Maturity Date</TableHead>
              </>
            )}
            {type === "Commodity" && (
              <>
                <TableHead className="text-right">Expiry Date</TableHead>
              </>
            )}
            {type === "FX" && (
              <>
                <TableHead className="text-right">Base</TableHead>
                <TableHead className="text-right">Quote</TableHead>
              </>
            )}
            {type === "Derivative" && (
              <>
                <TableHead className="text-right">Delta</TableHead>
                {/* <TableHead className="text-right">Beta</TableHead> */}
              </>
            )}

            <TableHead className="text-right">P&L</TableHead>
            <TableHead className="text-right">Return %</TableHead>
            <TableHead className="text-right">Holding Period</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((position) => (
            <TableRow
              key={position.id}
              className="border-border hover:bg-muted/50"
            >
              <TableCell className="font-medium">{position.symbol}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {position.name}
              </TableCell>
              <TableCell className="text-right">
                {position.quantity.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(position.buyPrice, position.currency)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(position.currentPrice, position.currency)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(
                  position.quantity * position.currentPrice,
                  position.currency
                )}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(getDailyMTM(position.currentPrice))}
              </TableCell>

              {/* asset-specific values */}
              {type === "Bond" && (
                <>
                  <TableCell className="text-right">
                    {formatCurrency(position.accruedInterest ?? 0, position.currency)}
                  </TableCell>
                  <TableCell className="text-right">
                    {position.maturityDate ?? "-"}
                  </TableCell>
                </>
              )}
              {type === "Commodity" && (
                <TableCell className="text-right">
                  {position.expiryDate ?? "-"}
                </TableCell>
              )}
              {type === "FX" && (
                <>
                  <TableCell className="text-right">
                    {position.baseCurrency ?? "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {position.quoteCurrency ?? "-"}
                  </TableCell>
                </>
              )}
              {type === "Derivative" && (
                <>
                  <TableCell className="text-right">
                    {position.delta ?? "-"}
                  </TableCell>
                  {/* <TableCell className="text-right">
                    {position.beta ?? "-"}
                  </TableCell> */}
                </>
              )}

              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end gap-1 ${
                    position.marketValue - position.bookValue >= 0
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {position.marketValue - position.bookValue >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {formatCurrency(
                    position.marketValue - position.bookValue,
                    position.currency
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    position.totalReturnPercent >= 0
                      ? "text-success"
                      : "text-destructive"
                  }
                >
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
  );

  // group positions by type
  const equities = positions.filter((p) => p.assetClass === "Equity");
  const bonds = positions.filter((p) => p.assetClass === "Bond");
  const commodities = positions.filter((p) => p.assetClass === "Commodity");
  const fx = positions.filter((p) => p.assetClass === "FX");
  const derivatives = positions.filter((p) => p.assetClass === "Derivative");

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Portfolio Positions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Equity" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="Equity">Equities</TabsTrigger>
            <TabsTrigger value="Bond">Bonds</TabsTrigger>
            <TabsTrigger value="Commodity">Commodities</TabsTrigger>
            <TabsTrigger value="FX">FX</TabsTrigger>
            <TabsTrigger value="Derivative">Derivatives</TabsTrigger>
          </TabsList>

          <TabsContent value="Equity">{renderTable(equities, "Equity")}</TabsContent>
          <TabsContent value="Bond">{renderTable(bonds, "Bond")}</TabsContent>
          <TabsContent value="Commodity">
            {renderTable(commodities, "Commodity")}
          </TabsContent>
          <TabsContent value="FX">{renderTable(fx, "FX")}</TabsContent>
          <TabsContent value="Derivative">
            {renderTable(derivatives, "Derivative")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
