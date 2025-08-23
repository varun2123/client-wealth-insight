import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";
import { useState, useMemo } from "react";

interface BenchmarkComparison {
  period: string;
  benchmark: string;
  portfolioReturn: number;
  benchmarkReturn: number;
  alpha: number;
  beta: number;
  correlation: number;
  trackingError: number;
  informationRatio: number;
}

interface BenchmarkChartProps {
  comparisons?: BenchmarkComparison[];
}

export const BenchmarkChart = ({ comparisons = [] }: BenchmarkChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");

  // Generate chart data for both benchmarks
  const generateChartData = (period: string) => {
    const dataPoints =
      period === "1M" ? 30 : period === "3M" ? 90 : period === "6M" ? 180 : period === "3Y" ? 1095 : 365;

    const data: any[] = [];
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (dataPoints - i));
      // Mock portfolio performance
      const portfolioReturn = (Math.random() - 0.5) * 20 + (i / dataPoints) * 15;
      // Mock NASDAQ performance
      const nasdaqReturn = (Math.random() - 0.5) * 15 + (i / dataPoints) * 12;
      // Mock FTSE performance
      const ftseReturn = (Math.random() - 0.5) * 10 + (i / dataPoints) * 10;
      data.push({
        date: date.toISOString().split("T")[0],
        portfolio: portfolioReturn,
        NASDAQ: nasdaqReturn,
        FTSE: ftseReturn,
      });
    }
    return data;
  };

  const chartData = useMemo(() => generateChartData(selectedPeriod), [selectedPeriod]);

  // Helpers
  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const calculateComparison = (data: any[], benchmark: "NASDAQ" | "FTSE"): BenchmarkComparison => {
    const portfolioStart = data[0].portfolio;
    const portfolioEnd = data[data.length - 1].portfolio;
    const benchmarkStart = data[0][benchmark];
    const benchmarkEnd = data[data.length - 1][benchmark];

    const portfolioReturn = ((portfolioEnd - portfolioStart) / portfolioStart) * 100;
    const benchmarkReturn = ((benchmarkEnd - benchmarkStart) / benchmarkStart) * 100;
    const alpha = portfolioReturn - benchmarkReturn;

    // daily returns
    const portfolioChanges = data.map((d: any, i: number) =>
      i === 0 ? 0 : (d.portfolio - data[i - 1].portfolio) / data[i - 1].portfolio
    );
    const benchmarkChanges = data.map((d: any, i: number) =>
      i === 0 ? 0 : (d[benchmark] - data[i - 1][benchmark]) / data[i - 1][benchmark]
    );

    // covariance and variance for beta
    const pAvg = avg(portfolioChanges);
    const bAvg = avg(benchmarkChanges);
    const cov =
      portfolioChanges.reduce((acc, val, i) => acc + (val - pAvg) * (benchmarkChanges[i] - bAvg), 0) /
      portfolioChanges.length;
    const varB =
      benchmarkChanges.reduce((acc, val) => acc + Math.pow(val - bAvg, 2), 0) / benchmarkChanges.length;
    const beta = varB !== 0 ? cov / varB : 0;

    // correlation
    const corr =
      cov /
      (Math.sqrt(portfolioChanges.reduce((acc, val) => acc + Math.pow(val - pAvg, 2), 0) / portfolioChanges.length) *
        Math.sqrt(varB));

    // tracking error (std dev of difference in returns)
    const diffReturns = portfolioChanges.map((val, i) => val - benchmarkChanges[i]);
    const trackingError = Math.sqrt(
      diffReturns.reduce((acc, val) => acc + Math.pow(val - avg(diffReturns), 2), 0) / diffReturns.length
    ) * 100;

    const informationRatio = trackingError !== 0 ? alpha / trackingError : 0;

    return {
      period: selectedPeriod,
      benchmark,
      portfolioReturn,
      benchmarkReturn,
      alpha,
      beta,
      correlation: corr,
      trackingError,
      informationRatio,
    };
  };

  const calculatedComparisons: BenchmarkComparison[] = useMemo(
    () => [calculateComparison(chartData, "NASDAQ"), calculateComparison(chartData, "FTSE")],
    [chartData, selectedPeriod]
  );

  const allComparisons = comparisons.length ? comparisons : calculatedComparisons;

  const getComparison = (benchmark: string) =>
    allComparisons.find((c) => c.period === selectedPeriod && c.benchmark === benchmark);

  const formatPercent = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

  return (
    <Card className="bg-gradient-card border-border col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Portfolio vs NASDAQ & FTSE Performance
          </CardTitle>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">1 Month</SelectItem>
              <SelectItem value="3M">3 Months</SelectItem>
              <SelectItem value="6M">6 Months</SelectItem>
              <SelectItem value="1Y">1 Year</SelectItem>
              <SelectItem value="3Y">3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Performance Summary for NASDAQ */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg border border-border mb-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Portfolio Return</div>
              <div
                className={`text-lg font-bold ${
                  getComparison("NASDAQ")?.portfolioReturn >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {formatPercent(getComparison("NASDAQ")?.portfolioReturn || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">NASDAQ Return</div>
              <div
                className={`text-lg font-bold ${
                  getComparison("NASDAQ")?.benchmarkReturn >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {formatPercent(getComparison("NASDAQ")?.benchmarkReturn || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Alpha</div>
              <div
                className={`text-lg font-bold ${getComparison("NASDAQ")?.alpha >= 0 ? "text-success" : "text-destructive"}`}
              >
                {formatPercent(getComparison("NASDAQ")?.alpha || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Beta</div>
              <div className="text-lg font-bold text-foreground">
                {getComparison("NASDAQ")?.beta.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>

          {/* Performance Summary for FTSE */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Portfolio Return</div>
              <div
                className={`text-lg font-bold ${
                  getComparison("FTSE")?.portfolioReturn >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {formatPercent(getComparison("FTSE")?.portfolioReturn || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">FTSE Return</div>
              <div
                className={`text-lg font-bold ${
                  getComparison("FTSE")?.benchmarkReturn >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {formatPercent(getComparison("FTSE")?.benchmarkReturn || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Alpha</div>
              <div
                className={`text-lg font-bold ${getComparison("FTSE")?.alpha >= 0 ? "text-success" : "text-destructive"}`}
              >
                {formatPercent(getComparison("FTSE")?.alpha || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Beta</div>
              <div className="text-lg font-bold text-foreground">
                {getComparison("FTSE")?.beta.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(2)}%`,
                    name === "portfolio" ? "Portfolio" : name,
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Portfolio"
                />
                <Line
                  type="monotone"
                  dataKey="NASDAQ"
                  stroke="#0074d9"
                  strokeWidth={2}
                  dot={false}
                  name="NASDAQ"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="FTSE"
                  stroke="#2ecc40"
                  strokeWidth={2}
                  dot={false}
                  name="FTSE"
                  strokeDasharray="2 2"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Additional Metrics for NASDAQ */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border mb-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Correlation (NASDAQ)</div>
              <div className="text-lg font-semibold text-foreground">
                {getComparison("NASDAQ")?.correlation.toFixed(3) || "0.000"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Tracking Error (NASDAQ)</div>
              <div className="text-lg font-semibold text-foreground">
                {formatPercent(getComparison("NASDAQ")?.trackingError || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Information Ratio (NASDAQ)</div>
              <div className="text-lg font-semibold text-foreground">
                {getComparison("NASDAQ")?.informationRatio.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>

          {/* Additional Metrics for FTSE */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Correlation (FTSE)</div>
              <div className="text-lg font-semibold text-foreground">
                {getComparison("FTSE")?.correlation.toFixed(3) || "0.000"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Tracking Error (FTSE)</div>
              <div className="text-lg font-semibold text-foreground">
                {formatPercent(getComparison("FTSE")?.trackingError || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Information Ratio (FTSE)</div>
              <div className="text-lg font-semibold text-foreground">
                {getComparison("FTSE")?.informationRatio.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
