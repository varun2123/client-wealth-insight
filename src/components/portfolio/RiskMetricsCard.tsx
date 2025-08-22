import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskMetrics } from "@/types/portfolio";
import { Activity, TrendingDown, BarChart3, Target } from "lucide-react";

interface RiskMetricsCardProps {
  metrics: RiskMetrics;
}

export const RiskMetricsCard = ({ metrics }: RiskMetricsCardProps) => {
  const formatPercent = (value: number) => `${value.toFixed(2)}%`;
  const formatDecimal = (value: number) => value.toFixed(3);

  const getRiskLevel = (volatility: number) => {
    if (volatility < 10) return { level: 'Low', color: 'text-success', progress: 33 };
    if (volatility < 20) return { level: 'Medium', color: 'text-warning', progress: 66 };
    return { level: 'High', color: 'text-destructive', progress: 100 };
  };

  const riskLevel = getRiskLevel(metrics.volatility);

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Risk Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Portfolio Beta</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatDecimal(metrics.portfolioBeta)}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.portfolioBeta > 1 ? 'More volatile than market' : 'Less volatile than market'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Portfolio Delta</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatDecimal(metrics.portfolioDelta)}
            </div>
            <p className="text-xs text-muted-foreground">
              Price sensitivity measure
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
              <span className="text-lg font-semibold text-foreground">
                {formatDecimal(metrics.sharpeRatio)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {metrics.sharpeRatio > 1 ? 'Excellent' : metrics.sharpeRatio > 0.5 ? 'Good' : 'Poor'} risk-adjusted return
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">volatility</span>
              <span className={`text-lg font-semibold ${riskLevel.color}`}>
                {formatPercent(metrics.volatility)}
              </span>
            </div>
            <div className="space-y-2">
              <Progress value={riskLevel.progress} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Risk Level:</span>
                <span className={riskLevel.color}>{riskLevel.level}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-3 h-3 text-destructive" />
                <span className="text-xs text-muted-foreground">VaR (95%)</span>
              </div>
              <div className="text-lg font-semibold text-destructive">
                {formatPercent(metrics.var95)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-3 h-3 text-destructive" />
                <span className="text-xs text-muted-foreground">Max Drawdown</span>
              </div>
              <div className="text-lg font-semibold text-destructive">
                {formatPercent(metrics.maxDrawdown)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};