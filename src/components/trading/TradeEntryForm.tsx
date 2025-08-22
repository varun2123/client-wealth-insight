import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Trade } from "@/types/portfolio";
import { toast } from "sonner";

interface TradeEntryFormProps {
  onTradeAdd: (trade: Omit<Trade, 'id'>) => void;
}

export const TradeEntryForm = ({ onTradeAdd }: TradeEntryFormProps) => {
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'BUY' as 'BUY' | 'SELL',
    quantity: '',
    price: '',
    currency: 'USD',
    commission: '',
  });
  const [tradeDate, setTradeDate] = useState<Date>(new Date());
  const [settlementDate, setSettlementDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.symbol || !formData.quantity || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const quantity = parseFloat(formData.quantity);
    const price = parseFloat(formData.price);
    const commission = parseFloat(formData.commission) || 0;

    const newTrade: Omit<Trade, 'id'> = {
      symbol: formData.symbol.toUpperCase(),
      type: formData.type,
      quantity,
      price,
      amount: quantity * price,
      currency: formData.currency,
      tradeDate: format(tradeDate, 'yyyy-MM-dd'),
      settlementDate: format(settlementDate, 'yyyy-MM-dd'),
      commission,
      status: 'Executed',
    };

    onTradeAdd(newTrade);
    toast.success(`${formData.type} order for ${formData.symbol} has been added`);
    
    // Reset form
    setFormData({
      symbol: '',
      type: 'BUY',
      quantity: '',
      price: '',
      currency: 'USD',
      commission: '',
    });
    setTradeDate(new Date());
    setSettlementDate(new Date());
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-primary" />
          Manual Trade Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol *</Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                value={formData.symbol}
                onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Trade Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'BUY' | 'SELL') => setFormData({...formData, type: value})}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="100"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="150.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission">Commission</Label>
              <Input
                id="commission"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.commission}
                onChange={(e) => setFormData({...formData, commission: e.target.value})}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Trade Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-input border-border">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(tradeDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tradeDate}
                    onSelect={(date) => date && setTradeDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Settlement Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-input border-border">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(settlementDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={settlementDate}
                    onSelect={(date) => date && setSettlementDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
              Add Trade
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};