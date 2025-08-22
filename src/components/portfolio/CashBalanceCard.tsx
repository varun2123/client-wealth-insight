import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashBalance } from "@/types/portfolio";
import { Banknote, DollarSign, Euro, PoundSterling } from "lucide-react";

interface CashBalanceCardProps {
  balances: CashBalance[];
}

export const CashBalanceCard = ({ balances }: CashBalanceCardProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD': return <DollarSign className="w-4 h-4" />;
      case 'EUR': return <Euro className="w-4 h-4" />;
      case 'GBP': return <PoundSterling className="w-4 h-4" />;
      default: return <Banknote className="w-4 h-4" />;
    }
  };

  const totalUSD = balances.reduce((total, balance) => {
    // Simple conversion assuming 1:1 for demo - in real app, use actual exchange rates
    const rate = balance.currency === 'EUR' ? 1.1 : balance.currency === 'GBP' ? 1.25 : 1;
    return total + (balance.balance * rate);
  }, 0);

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Banknote className="w-5 h-5 text-primary" />
          Cash Balances
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">Total Cash (USD Equivalent)</div>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(totalUSD, 'USD')}
          </div>
        </div>

        <div className="space-y-3">
          {balances.map((balance, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full text-primary">
                  {getCurrencyIcon(balance.currency)}
                </div>
                <div>
                  <div className="font-medium text-foreground">{balance.currency}</div>
                  <div className="text-xs text-muted-foreground">Available: {formatCurrency(balance.availableBalance, balance.currency)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">
                  {formatCurrency(balance.balance, balance.currency)}
                </div>
                {balance.reservedBalance > 0 && (
                  <div className="text-xs text-warning">
                    Reserved: {formatCurrency(balance.reservedBalance, balance.currency)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {balances.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Banknote className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No cash balances available</p>
            <p className="text-sm">Upload portfolio data to view cash positions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};