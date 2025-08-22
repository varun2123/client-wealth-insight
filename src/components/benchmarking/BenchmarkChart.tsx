import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BenchmarkComparison } from "@/types/portfolio";
import { TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";

interface BenchmarkChartProps {
  comparisons: BenchmarkComparison[];
}

export const BenchmarkChart = ({ comparisons }: BenchmarkChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1Y');

  // Mock data for the chart - in a real app, this would come from your data source
  const generateChartData = (period: string) => {
    const dataPoints = period === '1M' ? 30 : period === '3M' ? 90 : period === '6M' ? 180 : 365;
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (dataPoints - i));
      
      // Mock portfolio performance with some volatility
      const portfolioReturn = 100 + (Math.random() - 0.5) * 20 + (i / dataPoints) * 15;
      // Mock benchmark performance (slightly more stable)
      const benchmarkReturn = 100 + (Math.random() - 0.5) * 15 + (i / dataPoints) * 12;
      
      data.push({
        date: date.toISOString().split('T')[0],
        portfolio: portfolioReturn,
        benchmark: benchmarkReturn,
      });
    }
    
    return data;
  };

  const chartData = generateChartData(selectedPeriod);
  const currentComparison = comparisons.find(c => c.period === selectedPeriod) || comparisons[0];

  const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <Card className="bg-gradient-card border-border col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Portfolio vs Benchmark Performance
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
          {/* Performance Summary */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Portfolio Return</div>
              <div className={`text-lg font-bold ${
                currentComparison?.portfolioReturn >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {formatPercent(currentComparison?.portfolioReturn || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Benchmark Return</div>
              <div className={`text-lg font-bold ${
                currentComparison?.benchmarkReturn >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {formatPercent(currentComparison?.benchmarkReturn || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Alpha</div>
              <div className={`text-lg font-bold ${
                currentComparison?.alpha >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {formatPercent(currentComparison?.alpha || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Beta</div>
              <div className="text-lg font-bold text-foreground">
                {currentComparison?.beta.toFixed(2) || '0.00'}
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
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(2)}%`,
                    name === 'portfolio' ? 'Portfolio' : 'Benchmark'
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
                  dataKey="benchmark"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  dot={false}
                  name="Benchmark"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Correlation</div>
              <div className="text-lg font-semibold text-foreground">
                {currentComparison?.correlation.toFixed(3) || '0.000'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Tracking Error</div>
              <div className="text-lg font-semibold text-foreground">
                {formatPercent(currentComparison?.trackingError || 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Information Ratio</div>
              <div className="text-lg font-semibold text-foreground">
                {currentComparison?.informationRatio.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};