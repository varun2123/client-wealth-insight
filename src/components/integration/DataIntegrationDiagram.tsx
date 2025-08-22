import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Download, BarChart3, TrendingUp, Shield, Zap } from "lucide-react";

export const DataIntegrationDiagram = () => {
  return (
    <Card className="bg-gradient-card border-border col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Data Integration Architecture
        </CardTitle>
        <p className="text-muted-foreground">
          Integration flow for external data sources like Bloomberg with internal static data
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* External Data Sources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">External Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  <h4 className="font-semibold text-blue-300">Bloomberg Terminal</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time market data</li>
                  <li>• Historical prices</li>
                  <li>• Corporate actions</li>
                  <li>• News & analytics</li>
                </ul>
                <Badge className="mt-2 bg-blue-500/20 text-blue-300">Real-time</Badge>
              </div>
              
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <h4 className="font-semibold text-green-300">Reuters/Refinitiv</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Market indices</li>
                  <li>• Benchmark data</li>
                  <li>• Currency rates</li>
                  <li>• Economic indicators</li>
                </ul>
                <Badge className="mt-2 bg-green-500/20 text-green-300">Batch/Real-time</Badge>
              </div>
              
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <h4 className="font-semibold text-purple-300">Exchange APIs</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• NYSE/NASDAQ feeds</li>
                  <li>• LSE market data</li>
                  <li>• Currency pairs</li>
                  <li>• Commodity prices</li>
                </ul>
                <Badge className="mt-2 bg-purple-500/20 text-purple-300">Real-time</Badge>
              </div>
            </div>
          </div>

          {/* Integration Layer */}
          <div className="relative">
            <h3 className="text-lg font-semibold text-foreground mb-4">Integration & Processing Layer</h3>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary">Data Ingestion</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• API connections</li>
                    <li>• File processing</li>
                    <li>• Data validation</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary">Data Processing</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data cleansing</li>
                    <li>• Transformation</li>
                    <li>• Enrichment</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary">Quality Control</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data validation</li>
                    <li>• Error handling</li>
                    <li>• Reconciliation</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary">Data Storage</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Time-series DB</li>
                    <li>• Data warehouse</li>
                    <li>• Caching layer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Static Data */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Internal Static Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-semibold text-amber-300 mb-2">Client Data</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Account information</li>
                  <li>• Investment objectives</li>
                  <li>• Risk tolerance</li>
                  <li>• Compliance rules</li>
                </ul>
              </div>
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-semibold text-amber-300 mb-2">Security Master</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Security identifiers</li>
                  <li>• Classification data</li>
                  <li>• Corporate structure</li>
                  <li>• Pricing sources</li>
                </ul>
              </div>
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-semibold text-amber-300 mb-2">Configuration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Calculation rules</li>
                  <li>• Report templates</li>
                  <li>• Business calendars</li>
                  <li>• System parameters</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Output Systems */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Output & Reporting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-success/10 border border-success/20 rounded-lg">
                <h4 className="font-semibold text-success mb-2">Portfolio Reporting System</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Daily portfolio statements</li>
                  <li>• Performance analytics</li>
                  <li>• Risk metrics calculation</li>
                  <li>• Regulatory reporting</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-success/10 border border-success/20 rounded-lg">
                <h4 className="font-semibold text-success mb-2">Client Interfaces</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Web dashboard</li>
                  <li>• Mobile applications</li>
                  <li>• API endpoints</li>
                  <li>• Automated alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};