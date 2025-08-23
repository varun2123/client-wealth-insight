import { Button } from "@/components/ui/button";
import {BarChart3, TrendingUp, Settings, Download } from "lucide-react";

interface HeaderProps {
  onFileUpload: () => void;
  onDownload?: () => void;
  clientName?: string;
}

export const Header = ({ onFileUpload, clientName = "Global Wealth Client" , onDownload}: HeaderProps) => {
  return (
    <header className="bg-gradient-card border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Portfolio Reporting System
          </h1>
          <p className="text-muted-foreground mt-1">
            {clientName} • Real-time Portfolio Analytics
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={() => window.open("/pdf", "_blank")}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Portfolio
          </Button>
          
          {/* <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <BarChart3 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <TrendingUp className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};