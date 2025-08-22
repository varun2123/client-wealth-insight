import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { Position, Trade, CashBalance } from "@/types/portfolio";

interface ExcelUploadProps {
  onDataLoaded: (data: {
    positions: Position[];
    trades: Trade[];
    cashBalances: CashBalance[];
  }) => void;
  onClose: () => void;
}

export const ExcelUpload = ({ onDataLoaded, onClose }: ExcelUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('idle');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Parse different sheets
      const positions = parsePositionsSheet(workbook);
      const trades = parseTradesSheet(workbook);
      const cashBalances = parseCashBalancesSheet(workbook);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      onDataLoaded({ positions, trades, cashBalances });
      setUploadStatus('success');
      toast.success(`Successfully loaded ${positions.length} positions, ${trades.length} trades, and ${cashBalances.length} cash balances`);
      
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error parsing Excel file:', error);
      setUploadStatus('error');
      toast.error('Error parsing Excel file. Please check the format and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const parsePositionsSheet = (workbook: XLSX.WorkBook): Position[] => {
    const sheet = workbook.Sheets['Positions'] || workbook.Sheets['positions'] || workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) return [];

    const jsonData = XLSX.utils.sheet_to_json(sheet);
    
    return jsonData.map((row: any, index: number) => ({
      id: `pos-${index}`,
      symbol: row.Symbol || row.symbol || '',
      name: row.Name || row.name || row.Company || '',
      quantity: parseFloat(row.Quantity || row.quantity || 0),
      buyPrice: parseFloat(row['Buy Price'] || row.buyPrice || row['Buy Price'] || 0),
      currentPrice: parseFloat(row['Current Price'] || row.currentPrice || row.Price || 0),
      marketValue: parseFloat(row['Market Value'] || row.marketValue || 0),
      bookValue: parseFloat(row['Book Value'] || row.bookValue || 0),
      unrealizedPnL: parseFloat(row['Unrealized PnL'] || row.unrealizedPnL || 0),
      realizedPnL: parseFloat(row['Realized PnL'] || row.realizedPnL || 0),
      totalReturn: parseFloat(row['Total Return'] || row.totalReturn || 0),
      totalReturnPercent: parseFloat(row['Return %'] || row.returnPercent || 0),
      currency: row.Currency || row.currency || 'USD',
      sector: row.Sector || row.sector || 'Unknown',
      assetClass: row['Asset Class'] || row.assetClass || 'Equity',
      purchaseDate: row['Purchase Date'] || row.purchaseDate || new Date().toISOString().split('T')[0],
      holdingPeriod: parseInt(row['Holding Period'] || row.holdingPeriod || 0),
      beta: parseFloat(row.Beta || row.beta || 1),
      delta: parseFloat(row.Delta || row.delta || 0),
    }));
  };

  const parseTradesSheet = (workbook: XLSX.WorkBook): Trade[] => {
    const sheet = workbook.Sheets['Trades'] || workbook.Sheets['trades'];
    if (!sheet) return [];

    const jsonData = XLSX.utils.sheet_to_json(sheet);
    
    return jsonData.map((row: any, index: number) => ({
      id: `trade-${index}`,
      symbol: row.Symbol || row.symbol || '',
      type: (row.Type || row.type || 'BUY').toUpperCase() as 'BUY' | 'SELL',
      quantity: parseFloat(row.Quantity || row.quantity || 0),
      price: parseFloat(row.Price || row.price || 0),
      amount: parseFloat(row.Amount || row.amount || 0),
      currency: row.Currency || row.currency || 'USD',
      tradeDate: row['Trade Date'] || row.tradeDate || new Date().toISOString().split('T')[0],
      settlementDate: row['Settlement Date'] || row.settlementDate || new Date().toISOString().split('T')[0],
      commission: parseFloat(row.Commission || row.commission || 0),
      status: row.Status || row.status || 'Executed',
    }));
  };

  const parseCashBalancesSheet = (workbook: XLSX.WorkBook): CashBalance[] => {
    const sheet = workbook.Sheets['Cash'] || workbook.Sheets['cash'] || workbook.Sheets['Cash Balances'];
    if (!sheet) {
      // Return default USD balance if no cash sheet found
      return [{
        currency: 'USD',
        balance: 100000,
        availableBalance: 95000,
        reservedBalance: 5000,
      }];
    }

    const jsonData = XLSX.utils.sheet_to_json(sheet);
    
    return jsonData.map((row: any) => ({
      currency: row.Currency || row.currency || 'USD',
      balance: parseFloat(row.Balance || row.balance || 0),
      availableBalance: parseFloat(row['Available Balance'] || row.availableBalance || 0),
      reservedBalance: parseFloat(row['Reserved Balance'] || row.reservedBalance || 0),
    }));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            Upload Portfolio Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Upload an Excel file with your portfolio data. The file should contain sheets named:
            </p>
            <ul className="text-sm text-muted-foreground text-left space-y-1 mb-6">
              <li>• <strong>Positions</strong> - Your current holdings</li>
              <li>• <strong>Trades</strong> - Transaction history</li>
              <li>• <strong>Cash</strong> - Cash balances by currency</li>
            </ul>
          </div>

          {!isUploading && uploadStatus === 'idle' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Excel File
              </Button>
            </>
          )}

          {isUploading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm text-foreground">Processing Excel file...</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-center text-muted-foreground">
                {uploadProgress < 50 ? 'Reading file...' : uploadProgress < 90 ? 'Parsing data...' : 'Finalizing...'}
              </p>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
              <div>
                <p className="text-lg font-semibold text-success">Upload Successful!</p>
                <p className="text-sm text-muted-foreground">Your portfolio data has been loaded.</p>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="text-center space-y-4">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
              <div>
                <p className="text-lg font-semibold text-destructive">Upload Failed</p>
                <p className="text-sm text-muted-foreground">Please check your file format and try again.</p>
              </div>
              <Button
                onClick={() => {
                  setUploadStatus('idle');
                  setUploadProgress(0);
                }}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};